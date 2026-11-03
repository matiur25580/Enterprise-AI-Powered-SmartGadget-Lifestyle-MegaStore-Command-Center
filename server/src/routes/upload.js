const express=require('express');const multer=require('multer');const path=require('path');const fs=require('fs');const crypto=require('crypto');
const router=express.Router();
const {protect,allow}=require('../middleware/auth');
const uploadDir=path.join(__dirname,'../../uploads');fs.mkdirSync(uploadDir,{recursive:true});
const extensions={'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp','image/avif':'.avif','image/gif':'.gif','video/mp4':'.mp4','video/webm':'.webm','video/quicktime':'.mov'};
const storage=multer.diskStorage({destination:uploadDir,filename:(req,file,cb)=>cb(null,crypto.randomUUID()+extensions[file.mimetype])});
const makeUpload=(types,size)=>multer({storage,limits:{fileSize:size},fileFilter:(req,file,cb)=>{if(types.includes(file.mimetype))cb(null,true);else cb(new Error('Unsupported file type'))}});
const imageUpload=makeUpload(['image/jpeg','image/png','image/webp','image/avif','image/gif'],5*1024*1024);const videoUpload=makeUpload(['video/mp4','video/webm','video/quicktime'],50*1024*1024);
const handleUpload=(upload,field)=>(req,res,next)=>upload.single(field)(req,res,error=>{
  if(!error)return next();
  error.status=error instanceof multer.MulterError&&error.code==='LIMIT_FILE_SIZE'?413:400;
  next(error);
});
router.post('/product-photo',protect,allow('Admin','Seller'),handleUpload(imageUpload,'photo'),(req,res)=>{if(!req.file)return res.status(400).json({success:false,message:'Photo is required'});res.json({success:true,message:'Photo uploaded successfully',url:'/uploads/'+req.file.filename})});
router.post('/review-video',protect,allow('Customer'),handleUpload(videoUpload,'video'),(req,res)=>{if(!req.file)return res.status(400).json({success:false,message:'Video is required'});res.json({success:true,message:'Video uploaded successfully',url:'/uploads/'+req.file.filename})});
module.exports=router;
