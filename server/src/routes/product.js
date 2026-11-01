const express=require('express');const Product=require('../models/Product');
const router=express.Router();
router.post('/add',async(req,res)=>{try{const p=await Product.create(req.body);res.json({success:true,message:'Product added successfully',product:p})}catch(e){res.status(500).json({success:false,message:e.message})}});
router.get('/all',async(req,res)=>{
  try{
    const {category,search,minPrice,maxPrice,sort='createdAt',order='desc',page=1,limit=20}=req.query;
    let q={};
    if(category && category!=='all') q.category=category;
    if(search) q.name={$regex:search,$options:'i'};
    if(minPrice||maxPrice) q.price={...(minPrice?{$gte:Number(minPrice)}:{}),...(maxPrice?{$lte:Number(maxPrice)}:{})};
    const skip=(Number(page)-1)*Number(limit);
    const total=await Product.countDocuments(q);
    const list=await Product.find(q).sort({[sort]:order==='asc'?1:-1}).skip(skip).limit(Number(limit));
    res.json({success:true,message:'Products fetched successfully',total,pages:Math.ceil(total/limit),page:Number(page),products:list});
  }catch(e){res.status(500).json({success:false,message:e.message})}
});
router.get('/combo/:id',async(req,res)=>{
  try{const main=await Product.findById(req.params.id);if(!main) return res.status(404).json({success:false,message:'Not found'});
  const perfect=await Product.find({_id:{$ne:main._id},comboTags:{$in:main.comboTags}}).limit(8);
  res.json({success:true,message:'Perfect combo found successfully',main:main.name,perfect});}
  catch(e){res.status(500).json({success:false,message:e.message})}
});
router.put('/stock/:id',async(req,res)=>{try{const p=await Product.findByIdAndUpdate(req.params.id,{stock:req.body.stock},{new:true});res.json({success:true,message:'Stock updated successfully',product:p})}catch(e){res.status(500).json({success:false,message:e.message})}});
router.delete('/:id',async(req,res)=>{try{await Product.findByIdAndDelete(req.params.id);res.json({success:true,message:'Product deleted successfully'})}catch(e){res.status(500).json({success:false,message:e.message})}});
router.post('/seed',async(req,res)=>{try{
  await Product.deleteMany({});
  const demo=[
    {name:'iPhone 15',category:'Mobile',subcategory:'iPhone',price:79900,stock:20,brand:'【entity-Apple¦canonical_name=Apple】',comboTags:['iphone','cover','adapter']},
    {name:'【entity-Samsung¦canonical_name=Samsung】 Galaxy A55',category:'Mobile',subcategory:'Android Phone',price:39999,stock:30,brand:'【entity-Samsung¦canonical_name=Samsung】',comboTags:['android','cover','charger']},
    {name:'【entity-Nokia¦canonical_name=Nokia】 110 Button Phone',category:'Mobile',subcategory:'Button Phone',price:1999,stock:100,brand:'【entity-Nokia¦canonical_name=Nokia】',comboTags:['buttonphone','charger']},
    {name:'AirPods Pro',category:'AudioPower',subcategory:'Earbuds',price:24900,stock:40,brand:'【entity-Apple¦canonical_name=Apple】',comboTags:['iphone','earbuds']},
    {name:'20W Adapter',category:'AudioPower',subcategory:'Adapter',price:1999,stock:80,brand:'【entity-Apple¦canonical_name=Apple】',comboTags:['iphone','adapter']},
    {name:'Type-C Cable 1M',category:'AudioPower',subcategory:'Charging Cable',price:799,stock:150,brand:'【entity-boAt¦canonical_name=boAt】',comboTags:['cable','charger']},
    {name:'65W Laptop Charger',category:'Computing',subcategory:'Laptop Charger',price:2499,stock:60,brand:'HP',comboTags:['laptop','charger']},
    {name:'HP Laptop 15s',category:'Computing',subcategory:'Laptop',price:55990,stock:15,brand:'HP',comboTags:['laptop','pendrive']},
    {name:'Pendrive 128GB',category:'Storage',subcategory:'Pendrive',price:1299,stock:200,brand:'SanDisk',comboTags:['laptop','pendrive']},
    {name:'Memory Card 64GB',category:'Storage',subcategory:'Memory Card',price:899,stock:180,brand:'【entity-Samsung¦canonical_name=Samsung】',comboTags:['android','memorycard']},
    {name:'iPhone Cover',category:'Protection',subcategory:'Mobile Cover',price:999,stock:120,brand:'Spigen',comboTags:['iphone','cover']},
    {name:'Aviator Sunglasses',category:'Lifestyle',subcategory:'Sunglasses',price:1999,stock:70,brand:'RayBan',comboTags:['sunglasses']},
    {name:'Leather Belt',category:'Lifestyle',subcategory:'Belt',price:899,stock:90,brand:'Woodland',comboTags:['belt']},
    {name:'Eye Glasses Bluecut',category:'Lifestyle',subcategory:'Eye Glasses',price:1499,stock:50,brand:'Lenskart',comboTags:['eyeglasses']},
  ];
  await Product.insertMany(demo);res.json({success:true,message:'Seeded successfully',count:demo.length});
}catch(e){res.status(500).json({success:false,message:e.message})}});
module.exports=router;
