const express=require('express');const mongoose=require('mongoose');const Order=require('../models/Order');
const Product=require('../models/Product');const {protect,allow}=require('../middleware/auth');
const {validate,orderRules}=require('../middleware/validate');
const {body}=require('express-validator');
const router=express.Router();
router.post('/create',protect,allow('Customer'),orderRules,validate,async(req,res,next)=>{
  let session;
  try{
    const {items,address}=req.body;
    if(!Array.isArray(items)||items.length===0||!address?.trim())return res.status(400).json({success:false,message:'Items and delivery address are required'});
    const quantities=new Map();
    for(const item of items){
      if(!item.productId||!mongoose.isValidObjectId(item.productId))return res.status(400).json({success:false,message:'Invalid product in cart'});
      const qty=Number(item.qty||1);
      if(!Number.isInteger(qty)||qty<1)return res.status(400).json({success:false,message:'Each quantity must be a positive whole number'});
      quantities.set(String(item.productId),(quantities.get(String(item.productId))||0)+qty);
    }
    session=await mongoose.startSession();
    let order;
    await session.withTransaction(async()=>{
      const normalized=[];
      for(const [productId,qty] of quantities){
        const product=await Product.findOneAndUpdate({_id:productId,stock:{$gte:qty}},{$inc:{stock:-qty}},{new:true,session});
        if(!product)throw Object.assign(new Error('A product is unavailable or has insufficient stock'),{status:409});
        normalized.push({productId:product._id,name:product.name,price:product.price,qty});
      }
      const total=normalized.reduce((sum,item)=>sum+item.price*item.qty,0);
      [order]=await Order.create([{customerId:req.user.id,customerEmail:req.user.email,items:normalized,total,address:address.trim(),status:'Pending'}],{session});
    });
    res.json({success:true,message:'Order placed successfully',order});
  }catch(e){next(e)}
  finally{if(session)await session.endSession()}
});
router.get('/my',protect,allow('Customer'),async(req,res,next)=>{
  try{
    const page=Math.max(1,Number.parseInt(req.query.page,10)||1);
    const limit=Math.min(100,Math.max(1,Number.parseInt(req.query.limit,10)||20));
    const filter={customerId:req.user.id};
    const [orders,total]=await Promise.all([
      Order.find(filter).sort({createdAt:-1}).skip((page-1)*limit).limit(limit),
      Order.countDocuments(filter),
    ]);
    res.json({success:true,count:total,total,pages:Math.ceil(total/limit),page,orders});
  }
  catch(e){next(e)}
});
router.get('/my/:email',protect,allow('Customer'),async(req,res,next)=>{
  if(req.params.email!==req.user.email)return res.status(403).json({success:false,message:'Access denied'});
  try{const list=await Order.find({customerId:req.user.id}).sort({createdAt:-1});
  res.json({success:true,count:list.length,orders:list});}
  catch(e){next(e)}
});
router.put('/status/:id',protect,allow('Admin','DeliveryAgent'),body('status').isIn(['Pending','Shipped','Delivered','Cancelled']),validate,async(req,res,next)=>{
  try{const o=await Order.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true});
  if(!o)return res.status(404).json({success:false,message:'Order not found'});
  res.json({success:true,message:'Order status updated successfully',order:o});}
  catch(e){next(e)}
});
module.exports=router;
