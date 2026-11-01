const mongoose=require('mongoose');
const s=new mongoose.Schema({
  productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
  customerEmail:String, rating:{type:Number,min:1,max:5}, comment:String,
},{timestamps:true});
module.exports=mongoose.model('Review',s);
