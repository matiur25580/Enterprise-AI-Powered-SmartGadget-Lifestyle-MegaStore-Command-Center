const mongoose=require('mongoose');
const s=new mongoose.Schema({
  code:{type:String,unique:true}, discount:{type:Number}, // % 
  active:{type:Boolean,default:true}, expiresAt:Date
},{timestamps:true});
module.exports=mongoose.model('Coupon',s);
