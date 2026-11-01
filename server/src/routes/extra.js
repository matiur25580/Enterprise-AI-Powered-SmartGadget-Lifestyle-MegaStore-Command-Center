const express=require('express');const Review=require('../models/Review');const Coupon=require('../models/Coupon');const Product=require('../models/Product');const Order=require('../models/Order');const User=require('../models/User');
const router=express.Router();
// Review add
router.post('/review/add',async(req,res)=>{try{const r=await Review.create(req.body);res.json({success:true,message:'Review added successfully',review:r})}catch(e){res.status(500).json({success:false,message:e.message})}});
router.get('/review/:productId',async(req,res)=>{try{const l=await Review.find({productId:req.params.productId}).sort({createdAt:-1});res.json({success:true,count:l.length,reviews:l})}catch(e){res.status(500).json({success:false,message:e.message})}});
// Coupon
router.post('/coupon/create',async(req,res)=>{try{const c=await Coupon.create(req.body);res.json({success:true,message:'Coupon created successfully',coupon:c})}catch(e){res.status(500).json({success:false,message:e.message})}});
router.post('/coupon/apply',async(req,res)=>{try{const c=await Coupon.findOne({code:req.body.code,active:true});if(!c) return res.status(400).json({success:false,message:'Invalid coupon'});res.json({success:true,message:'Coupon applied successfully',discount:c.discount})}catch(e){res.status(500).json({success:false,message:e.message})}});
// Admin analytics
router.get('/analytics/summary',async(req,res)=>{try{
  const totalProducts=await Product.countDocuments();const totalOrders=await Order.countDocuments();const totalUsers=await User.countDocuments();
  const orders=await Order.find();const revenue=orders.reduce((s,o)=>s+(o.total||0),0);
  res.json({success:true,message:'Analytics fetched successfully',data:{totalProducts,[STRIPPED]
}catch(e){res.status(500).json({success:false,message:e.message})}});
module.exports=router;
