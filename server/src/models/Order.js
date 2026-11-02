const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
  customerId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  customerEmail:String,
  items:[{productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},name:String,price:Number,qty:{type:Number,default:1}}],
  total:Number,
  status:{type:String,enum:['Pending','Shipped','Delivered','Cancelled'],default:'Pending'},
  address:String,
},{timestamps:true});
module.exports=mongoose.model('Order',orderSchema);
