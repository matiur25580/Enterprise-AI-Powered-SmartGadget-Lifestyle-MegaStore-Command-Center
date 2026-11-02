process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';

jest.mock('../src/models/User', () => ({ findOne: jest.fn(), create: jest.fn() }));
jest.mock('../src/models/Otp', () => ({ findOne: jest.fn(), create: jest.fn(), deleteMany: jest.fn() }));
jest.mock('../src/models/Product', () => ({
  countDocuments: jest.fn(), find: jest.fn(), findById: jest.fn(), create: jest.fn(),
  findOneAndUpdate: jest.fn(), findOneAndDelete: jest.fn(), insertMany: jest.fn(),
}));
jest.mock('../src/models/Order', () => ({ find: jest.fn(), countDocuments: jest.fn(), create: jest.fn(), findByIdAndUpdate: jest.fn() }));
jest.mock('../src/models/Coupon', () => ({ findOne: jest.fn() }));
jest.mock('../src/utils/sendEmail', () => jest.fn().mockResolvedValue(undefined));

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const Otp = require('../src/models/Otp');
const Product = require('../src/models/Product');
const Order = require('../src/models/Order');
const Coupon = require('../src/models/Coupon');

const productId = '507f1f77bcf86cd799439011';
const productBody = { name:'Phone', category:'Mobile', price:100, stock:5 };
const tokenFor = role => jwt.sign({ id:productId, role, email:'shopper@example.com' },process.env.JWT_SECRET);
const makeQuery = result => ({
  sort(){return this;},
  skip(){return this;},
  limit(){return Promise.resolve(result);},
});
const otpHash = (otp,email,role,purpose) => crypto.createHmac('sha256',process.env.JWT_SECRET).update(`${email}:${role}:${purpose}:${otp}`).digest('hex');

beforeEach(()=>{
  jest.clearAllMocks();
  User.findOne.mockResolvedValue(null);
  Otp.findOne.mockResolvedValue(null);
  Otp.deleteMany.mockResolvedValue({});
  Product.countDocuments.mockResolvedValue(0);
  Product.find.mockReturnValue(makeQuery([]));
  Product.findById.mockResolvedValue(null);
  Product.create.mockResolvedValue({ _id:productId,...productBody });
  Product.findOneAndUpdate.mockResolvedValue({ _id:productId,...productBody });
  Product.findOneAndDelete.mockResolvedValue({ _id:productId });
  Order.find.mockReturnValue(makeQuery([]));
  Order.countDocuments.mockResolvedValue(0);
  Coupon.findOne.mockResolvedValue(null);
});

describe('health and security middleware',()=>{
  it('reports API health and Mongo connection status',async()=>{
    const response=await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({status:'ok',db:expect.any(String),uptime:expect.any(Number)});
  });
  it('sets Helmet security headers',async()=>{
    const response=await request(app).get('/health');
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-frame-options']).toBeDefined();
  });
  it('serves Swagger UI at /api-docs',async()=>{
    const response=await request(app).get('/api-docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });
  it('does not expose internal error details in production',async()=>{
    const previousEnvironment=process.env.NODE_ENV;
    const consoleError=jest.spyOn(console,'error').mockImplementation(()=>{});
    process.env.NODE_ENV='production';
    Coupon.findOne.mockRejectedValue(new Error('private database detail'));
    const response=await request(app).post('/api/extra/coupon/apply').send({code:'SAVE10'});
    process.env.NODE_ENV=previousEnvironment;
    consoleError.mockRestore();
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal server error');
    expect(JSON.stringify(response.body)).not.toContain('private database detail');
  });
});

describe('authentication',()=>{
  it('sends an OTP for a valid customer email',async()=>{
    const response=await request(app).post('/api/auth/send-otp').send({email:'shopper@example.com',role:'Customer'});
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
  it('rejects malformed OTP requests',async()=>{
    const response=await request(app).post('/api/auth/send-otp').send({email:'not-an-email',role:'Admin'});
    expect(response.status).toBe(400);
  });
  it('registers a customer after verifying the OTP',async()=>{
    const payload={fullName:'Shopper One',email:'shopper@example.com',contact:'1234567890',dob:'2000-01-01',password:'StrongPass1',role:'Customer',otp:'123456'};
    Otp.findOne.mockResolvedValue({otpHash:otpHash(payload.otp,payload.email,payload.role,'register')});
    User.create.mockResolvedValue({ ...payload, _id:productId, uniqueId:'CSH2000' });
    const response=await request(app).post('/api/auth/register').send(payload);
    expect(response.status).toBe(200);
    expect(User.create).toHaveBeenCalled();
  });
  it('rejects an incorrect registration OTP',async()=>{
    const response=await request(app).post('/api/auth/register').send({fullName:'Shopper One',email:'shopper@example.com',contact:'1234567890',dob:'2000-01-01',password:'StrongPass1',role:'Customer',otp:'123456'});
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/OTP/);
  });
  it('rejects registration with missing required fields',async()=>{
    const response=await request(app).post('/api/auth/register').send({email:'shopper@example.com'});
    expect(response.status).toBe(400);
  });
  it('authenticates a valid login',async()=>{
    User.findOne.mockResolvedValue({ _id:productId, role:'Customer', email:'shopper@example.com', uniqueId:'CSH2000', fullName:'Shopper', password:await bcrypt.hash('StrongPass1',4) });
    const response=await request(app).post('/api/auth/login').send({emailOrId:'shopper@example.com',password:'StrongPass1',role:'Customer'});
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
  it('rejects an incorrect password',async()=>{
    User.findOne.mockResolvedValue({ password:await bcrypt.hash('StrongPass1',4) });
    const response=await request(app).post('/api/auth/login').send({emailOrId:'shopper@example.com',password:'WrongPass1',role:'Customer'});
    expect(response.status).toBe(400);
  });
  it('validates login fields',async()=>{
    const response=await request(app).post('/api/auth/login').send({emailOrId:'',password:'',role:'Unknown'});
    expect(response.status).toBe(400);
  });
});

describe('product API',()=>{
  it('lists products with pagination metadata',async()=>{
    const response=await request(app).get('/api/products/all?page=2&limit=5');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({page:2,pages:0,total:0,products:[]});
  });
  it('requires authentication to create a product',async()=>{
    const response=await request(app).post('/api/product/add').send(productBody);
    expect(response.status).toBe(401);
  });
  it('rejects invalid product data',async()=>{
    const response=await request(app).post('/api/product/add').set('Authorization',`Bearer ${tokenFor('Admin')}`).send({...productBody,price:-1});
    expect(response.status).toBe(400);
  });
  it('creates a product for an authorized seller',async()=>{
    const response=await request(app).post('/api/product/add').set('Authorization',`Bearer ${tokenFor('Seller')}`).send(productBody);
    expect(response.status).toBe(200);
    expect(Product.create).toHaveBeenCalled();
  });
  it('requires authorization to update a product',async()=>{
    const response=await request(app).put(`/api/products/${productId}`).send(productBody);
    expect(response.status).toBe(401);
  });
  it('prevents customers from updating products',async()=>{
    const response=await request(app).put(`/api/products/${productId}`).set('Authorization',`Bearer ${tokenFor('Customer')}`).send(productBody);
    expect(response.status).toBe(403);
  });
  it('updates a product for an authorized admin',async()=>{
    const response=await request(app).put(`/api/products/${productId}`).set('Authorization',`Bearer ${tokenFor('Admin')}`).send(productBody);
    expect(response.status).toBe(200);
    expect(Product.findOneAndUpdate).toHaveBeenCalled();
  });
});

describe('order API',()=>{
  it('requires authentication to place orders',async()=>{
    const response=await request(app).post('/api/orders/create').send({items:[{productId}],address:'123 Main Street'});
    expect(response.status).toBe(401);
  });
  it('rejects an empty order',async()=>{
    const response=await request(app).post('/api/order/create').set('Authorization',`Bearer ${tokenFor('Customer')}`).send({items:[],address:'123 Main Street'});
    expect(response.status).toBe(400);
  });
  it('rejects an invalid product ID',async()=>{
    const response=await request(app).post('/api/order/create').set('Authorization',`Bearer ${tokenFor('Customer')}`).send({items:[{productId:'bad'}],address:'123 Main Street'});
    expect(response.status).toBe(400);
  });
  it('rejects an invalid quantity',async()=>{
    const response=await request(app).post('/api/order/create').set('Authorization',`Bearer ${tokenFor('Customer')}`).send({items:[{productId,qty:0}],address:'123 Main Street'});
    expect(response.status).toBe(400);
  });
  it('places an order and decrements product inventory',async()=>{
    const product={_id:productId,name:'Phone',price:100};
    Product.findOneAndUpdate.mockResolvedValue(product);
    Order.create.mockResolvedValue([{_id:'order-1',total:100}]);
    jest.spyOn(mongoose,'startSession').mockResolvedValue({withTransaction:callback=>callback(),endSession:jest.fn()});
    const response=await request(app).post('/api/orders/create').set('Authorization',`Bearer ${tokenFor('Customer')}`).send({items:[{productId,qty:1}],address:'123 Main Street'});
    expect(response.status).toBe(200);
    expect(response.body.order.total).toBe(100);
  });
  it('paginates the current customer order list',async()=>{
    Order.countDocuments.mockResolvedValue(21);
    const response=await request(app).get('/api/orders/my?page=2&limit=10').set('Authorization',`Bearer ${tokenFor('Customer')}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({page:2,total:21,pages:3});
  });
});

describe('coupon and referral validation',()=>{
  it('rejects invalid coupon characters',async()=>{
    const response=await request(app).post('/api/extra/coupon/apply').send({code:'<script>'});
    expect(response.status).toBe(400);
  });
  it('rejects a missing coupon code',async()=>{
    const response=await request(app).post('/api/extra/coupon/apply').send({});
    expect(response.status).toBe(400);
  });
  it('rejects unknown coupons',async()=>{
    const response=await request(app).post('/api/extra/coupon/apply').send({code:'NOTREAL'});
    expect(response.status).toBe(400);
  });
  it('returns the percentage for an active coupon',async()=>{
    Coupon.findOne.mockResolvedValue({discount:15});
    const response=await request(app).post('/api/extra/coupon/apply').send({code:'SAVE15'});
    expect(response.status).toBe(200);
    expect(response.body.discount).toBe(15);
  });
  it('rejects malformed referral codes',async()=>{
    const response=await request(app).post('/api/extra/referral/validate').send({code:'bad code'});
    expect(response.status).toBe(400);
  });
  it('checks a well-formed referral code',async()=>{
    User.findOne.mockResolvedValue({_id:productId});
    const response=await request(app).post('/api/extra/referral/validate').send({code:'CSH2000'});
    expect(response.status).toBe(200);
    expect(response.body.valid).toBe(true);
  });
});
