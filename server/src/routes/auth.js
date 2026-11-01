const express=require('express');const bcrypt=require('bcryptjs');const jwt=require('jsonwebtoken');
const User=require('../models/User');const Otp=require('../models/Otp');const sendEmail=require('../utils/sendEmail');
const router=express.Router();
function genUID(role,fullName,dob){
  const p=fullName.trim().split(/\s+/);
  return `${role[0].toUpperCase()}${(p[0]?.[0]||'X').toUpperCase()}${(p[1]?.[0]||p[0]?.[0]||'X').toUpperCase()}${dob}`;
}
router.post('/send-otp',async(req,res)=>{
  try{const{email,role,purpose}=req.body;const otp=Math.floor(100000+Math.random()*900000).toString();
  await Otp.deleteMany({email,role});await Otp.create({email,role,otp,purpose:purpose||'register'});
  await sendEmail(email,otp);res.json({success:true,message:'OTP sent successfully to your email'});}catch(e){res.status(500).json({success:false,message:e.message})}
});
router.post('/register',async(req,res)=>{
  try{const{fullName,email,contact,dob,password,role,otp}=req.body;
  const rec=await Otp.findOne({email,role,otp});if(!rec) return res.status(400).json({success:false,message:'Invalid or expired OTP'});
  if(await User.findOne({email,role})) return res.status(400).json({success:false,message:'Email already registered for this role'});
  const hash=await bcrypt.hash(password,10);const uniqueId=genUID(role,fullName,dob);
  const u=await User.create({fullName,email,contact,dob,password:hash,role,uniqueId});
  await Otp.deleteMany({email,role});res.json({success:true,message:'Registration successful! Welcome '+u.fullName,uniqueId:u.uniqueId,role:u.role,fullName:u.fullName});}catch(e){res.status(500).json({success:false,message:e.message})}
});
router.post('/login',async(req,res)=>{
  try{const{emailOrId,password,role}=req.body;
  const u=await User.findOne({$or:[{email:emailOrId},{uniqueId:emailOrId}],role});if(!u) return res.status(400).json({success:false,message:'Invalid credentials'});
  if(!await bcrypt.compare(password,u.password)) return res.status(400).json({success:false,message:'Invalid credentials'});
  const token=jwt.sign({id:u._id,role:u.role},process.env.JWT_SECRET,{expiresIn:'7d'});
  res.json({success:true,message:'Login successful! Welcome back '+u.fullName,token,role:u.role,uniqueId:u.uniqueId,fullName:u.fullName});}catch(e){res.status(500).json({success:false,message:e.message})}
});
// Forgot Password
router.post('/forgot-password',async(req,res)=>{
  try{const{email,role}=req.body;const u=await User.findOne({email,role});
  if(!u) return res.status(404).json({success:false,message:'No account found with this email and role'});
  const otp=Math.floor(100000+Math.random()*900000).toString();
  await Otp.deleteMany({email,role});await Otp.create({email,role,otp,purpose:'reset'});
  await sendEmail(email,otp);res.json({success:true,message:'Password reset OTP sent successfully to your email'});}catch(e){res.status(500).json({success:false,message:e.message})}
});
router.post('/reset-password',async(req,res)=>{
  try{const{email,role,otp,newPassword}=req.body;
  const rec=await Otp.findOne({email,role,otp,purpose:'reset'});if(!rec) return res.status(400).json({success:false,message:'Invalid or expired OTP'});
  const u=await User.findOne({email,role});
  if(await bcrypt.compare(newPassword,u.password)) return res.status(400).json({success:false,message:'This is your current password. Please enter a different password'});
  u.password=await bcrypt.hash(newPassword,10);await u.save();await Otp.deleteMany({email,role});
  res.json({success:true,message:'Password reset successful! Please login with new password'});}catch(e){res.status(500).json({success:false,message:e.message})}
});
module.exports=router;
