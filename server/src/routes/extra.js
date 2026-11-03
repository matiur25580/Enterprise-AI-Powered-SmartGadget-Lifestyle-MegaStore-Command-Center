const express = require('express');
const {body}=require('express-validator');const {validate}=require('../middleware/validate');
const Coupon=require('../models/Coupon');
const User=require('../models/User');
const Product=require('../models/Product');
const Order=require('../models/Order');
const {protect,allow}=require('../middleware/auth');
const router = express.Router();
router.get('/analytics/summary',protect,allow('Admin'),async(req,res,next)=>{
  try{
    const [totalProducts,totalOrders,totalUsers,revenueRows]=await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
      Order.aggregate([
        {$match:{status:{$ne:'Cancelled'}}},
        {$group:{_id:null,revenue:{$sum:'$total'}}},
      ]),
    ]);
    res.json({
      success:true,
      message:'Analytics fetched',
      data:{totalProducts,totalOrders,totalUsers,revenue:revenueRows[0]?.revenue||0},
    });
  }catch(error){next(error)}
});
router.post('/review/add', (req, res) => {
  res.json({ success: true, message: 'Review added' });
});
router.post('/coupon/apply',body('code').trim().notEmpty().isLength({max:40}).matches(/^[A-Za-z0-9_-]+$/),validate,async(req,res,next)=>{
  try{
    const coupon=await Coupon.findOne({code:req.body.code.toUpperCase(),active:true});
    if(!coupon||(coupon.expiresAt&&coupon.expiresAt<new Date()))return res.status(400).json({success:false,message:'Invalid or expired coupon'});
    res.json({success:true,message:'Coupon applied',discount:coupon.discount});
  }catch(error){next(error)}
});
router.post('/referral/validate',body('code').trim().notEmpty().isLength({max:80}).matches(/^[A-Za-z0-9_-]+$/),validate,async(req,res,next)=>{
  try{
    const referrer=await User.findOne({uniqueId:req.body.code});
    res.json({success:true,valid:Boolean(referrer),message:referrer?'Referral code is valid':'Referral code is invalid'});
  }catch(error){next(error)}
});
module.exports = router;
