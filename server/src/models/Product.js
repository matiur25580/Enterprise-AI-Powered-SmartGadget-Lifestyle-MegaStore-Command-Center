const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
  name:{type:String,required:true},
  category:{type:String,enum:['Mobile','AudioPower','Protection','Storage','Computing','Lifestyle'],required:true},
  subcategory:String, // Button Phone, iPhone, Earbuds, Charger etc
  price:{type:Number,required:true},
  stock:{type:Number,min:0,default:0},
  brand:String,
  sellerId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  comboTags:[String], // ["iphone","cover","charger"] - AI matching er jonno
  rating:{type:Number,default:4.5},
  image:String,
},{timestamps:true});
productSchema.index({category:1,price:1});
module.exports=mongoose.model('Product',productSchema);
