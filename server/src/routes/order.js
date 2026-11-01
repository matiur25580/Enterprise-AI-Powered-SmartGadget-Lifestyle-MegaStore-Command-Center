const express=require('express');const Order=require('../models/Order');
const router=express.Router();
router.post('/create',async(req,res)=>{
  try{const o=await Order.create(req.body);
  res.json({success:true,message:'Order placed successfully',order:o});}
  catch(e){res.status(500).json({success:false,message:e.message})}
});
router.get('/my/:email',async(req,res)=>{
  try{const list=await Order.find({customerEmail:req.params.email}).sort({createdAt:-1});
  res.json({success:true,count:list.length,orders:list});}
  catch(e){res.status(500).json({success:false,message:e.message})}
});
router.put('/status/:id',async(req,res)=>{
  try{const o=await Order.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true});
  res.json({success:true,message:'Order status updated successfully',order:o});}
  catch(e){res.status(500).json({success:false,message:e.message})}
});
module.exports=router;
