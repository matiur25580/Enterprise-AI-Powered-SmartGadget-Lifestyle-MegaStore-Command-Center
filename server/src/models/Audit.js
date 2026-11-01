const mongoose=require('mongoose');
module.exports=mongoose.model('Audit',new mongoose.Schema({
  action:String, by:String, role:String, details:String,
},{timestamps:true}));
