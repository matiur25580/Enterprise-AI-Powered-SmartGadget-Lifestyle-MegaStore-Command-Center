const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
  name:{type:String,required:true},
  category:{type:String,enum:['Mobile','AudioPower','Protection','Storage','Computing','Lifestyle'],required:true},
  subcategory:String,
  price:{type:Number,required:true},
  mrp:{type:Number},
  stock:{type:Number,min:0,default:0},
  brand:String,
  sellerId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  comboTags:[String],
  rating:{type:Number,default:4.5},
  image:String,
  images:[{url:String,caption:String}],
  monthlySales:{type:Number,default:0},
  highlights:[{icon:String,title:String,subtitle:String}],
  specs:{type:Object,default:{}},
},{timestamps:true});
productSchema.index({category:1,price:1});
module.exports=mongoose.model('Product',productSchema);
