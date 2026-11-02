const express=require('express');const mongoose=require('mongoose');const Order=require('../models/Order');
const Product=require('../models/Product');const {protect,allow}=require('../middleware/auth');
const router=express.Router();
router.post('/create',protect,allow('Customer'),async(req,res)=>{
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
  }catch(e){res.status(e.status||400).json({success:false,message:e.message})}
  finally{if(session)await session.endSession()}
});
router.get('/my/:email',protect,allow('Customer'),async(req,res)=>{
  if(req.params.email!==req.user.email)return res.status(403).json({success:false,message:'Access denied'});
  try{const list=await Order.find({customerEmail:req.user.email}).sort({createdAt:-1});
  res.json({success:true,count:list.length,orders:list});}
  catch(e){res.status(500).json({success:false,message:e.message})}
});
router.put('/status/:id',protect,allow('Admin','DeliveryAgent'),async(req,res)=>{
  try{const o=await Order.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true});
  res.json({success:true,message:'Order status updated successfully',order:o});}
  catch(e){res.status(500).json({success:false,message:e.message})}
});
module.exports=router;
