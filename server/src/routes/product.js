const express=require('express');const Product=require('../models/Product');
const router=express.Router();

// Add product (Seller/Admin)
router.post('/add',async(req,res)=>{
  try{const p=await Product.create(req.body);
  res.json({success:true,message:'Product added successfully',product:p});}
  catch(e){res.status(500).json({success:false,message:e.message})}
});

// All products with filter
router.get('/all',async(req,res)=>{
  try{const {category,search}=req.query;let q={};
  if(category) q.category=category;
  if(search) q.name={$regex:search,$options:'i'};
  const list=await Product.find(q).limit(100);
  res.json({success:true,count:list.length,products:list});}
  catch(e){res.status(500).json({success:false,message:e.message})}
});

// AI Perfect Combo - ei product er sathe perfect jinis gulo
router.get('/combo/:id',async(req,res)=>{
  try{
    const main=await Product.findById(req.params.id);
    if(!main) return res.status(404).json({success:false,message:'Product not found'});
    // comboTags match kore perfect items khujo
    const perfect=await Product.find({
      _id:{$ne:main._id},
      comboTags:{$in: main.comboTags}
    }).limit(8);
    res.json({success:true,message:'Perfect combo found successfully',main:main.name,perfect});
  }catch(e){res.status(500).json({success:false,message:e.message})}
});

// Seed demo products
router.post('/seed',async(req,res)=>{
  try{
    await Product.deleteMany({});
    const demo=[
      {name:'iPhone 15',category:'Mobile',subcategory:'iPhone',price:79900,stock:20,brand:'Apple',comboTags:['iphone','cover','adapter','cable','earbuds']},
      {name:'iPhone Cover Premium',category:'Protection',subcategory:'Mobile Cover',price:999,stock:100,brand:'AppleCare',comboTags:['iphone','cover']},
      {name:'20W Adapter',category:'AudioPower',subcategory:'Adapter',price:1999,stock:80,brand:'Apple',comboTags:['iphone','adapter','charger']},
      {name:'Type-C Charging Cable',category:'AudioPower',subcategory:'Charging Cable',price:799,stock:120,brand:'boAt',comboTags:['iphone','cable','charger']},
      {name:'AirPods Pro',category:'AudioPower',subcategory:'Earbuds',price:24900,stock:30,brand:'Apple',comboTags:['iphone','earbuds']},
      {name:'HP Laptop 15s',category:'Computing',subcategory:'Laptop',price:55990,stock:15,brand:'HP',comboTags:['laptop','charger','pendrive','mouse']},
      {name:'Laptop Charger 65W',category:'Computing',subcategory:'Laptop Charger',price:2499,stock:50,brand:'HP',comboTags:['laptop','charger']},
      {name:'Pendrive 128GB',category:'Storage',subcategory:'Pendrive',price:1299,stock:200,brand:'SanDisk',comboTags:['laptop','pendrive']},
      {name:'Sunglasses Aviator',category:'Lifestyle',subcategory:'Sunglasses',price:1999,stock:60,brand:'RayBan',comboTags:['sunglasses','lifestyle']},
      {name:'Leather Belt',category:'Lifestyle',subcategory:'Belt',price:899,stock:90,brand:'Woodland',comboTags:['belt','lifestyle']},
    ];
    await Product.insertMany(demo);
    res.json({success:true,message:'Demo products seeded successfully',count:demo.length});
  }catch(e){res.status(500).json({success:false,message:e.message})}
});
module.exports=router;
