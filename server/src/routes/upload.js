const express=require('express');const multer=require('multer');const path=require('path');
const router=express.Router();
const storage=multer.diskStorage({destination:'uploads/',filename:(req,file,cb)=>cb(null,Date.now()+path.extname(file.originalname))});
const upload=multer({storage,limits:{fileSize:5*1024*1024},fileFilter:(req,file,cb)=>{if(file.mimetype.startsWith('image/'))cb(null,true);else cb(new Error('Only images'))}});
router.post('/product-photo',upload.single('photo'),(req,res)=>{res.json({success:true,message:'Photo uploaded successfully',url:'/uploads/'+req.filename})});
router.post('/review-video',upload.single('video'),(req,res)=>{res.json({success:true,message:'Video uploaded successfully'})});
module.exports=router;
