const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
  name:{type:String,required:true},
  category:{type:String,enum:['Mobile','AudioPower','Protection','Storage','Computing','Lifestyle'],required:true},
  subcategory:String, // Button Phone, iPhone, Earbuds, Charger etc
  price:{type:Number,required:true},
  stock:Number,
  brand:String,
  comboTags:[String], // ["iphone","cover","charger"] - AI matching er jonno
  rating:{type:Number,default:4.5},
  image:String,
},{timestamps:true});
module.exports=mongoose.model('Product',productSchema);
