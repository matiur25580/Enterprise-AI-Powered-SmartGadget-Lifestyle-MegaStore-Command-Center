const express=require('express');const Product=require('../models/Product');
const mongoose=require('mongoose');
const {protect,allow}=require('../middleware/auth');
const {body}=require('express-validator');const {validate,productRules}=require('../middleware/validate');
const router=express.Router();
router.post('/add',protect,allow('Admin','Seller'),productRules,validate,async(req,res,next)=>{try{
  const {name,category,subcategory,price,mrp,stock,brand,comboTags,image}=req.body;
  const p=await Product.create({name,category,subcategory,price,mrp,stock,brand,comboTags,image,sellerId:req.user.id});
  res.json({success:true,message:'Product added successfully',product:p});
}catch(e){next(e)}});
router.put('/:id',protect,allow('Admin','Seller'),productRules,validate,async(req,res,next)=>{
  try{
    const filter={_id:req.params.id};if(req.user.role!=='Admin')filter.sellerId=req.user.id;
    const editableFields=['name','category','subcategory','price','stock','brand','comboTags','image','mrp','rating','highlights','specs','images'];
    const updates=Object.fromEntries(editableFields.filter(field=>Object.hasOwn(req.body,field)).map(field=>[field,req.body[field]]));
    const product=await Product.findOneAndUpdate(filter,updates,{new:true,runValidators:true});
    if(!product)return res.status(404).json({success:false,message:'Product not found'});
    res.json({success:true,message:'Product updated successfully',product});
  }catch(e){next(e)}
});
router.get('/all',async(req,res,next)=>{
  try{
    const {category,search,minPrice,maxPrice,sort='createdAt',order='desc',page=1,limit=20}=req.query;
    const sortField=['createdAt','price','name','rating'].includes(sort)?sort:'createdAt';
    const pageNumber=Math.max(1,Number.parseInt(page,10)||1);
    const pageSize=Math.min(60,Math.max(1,Number.parseInt(limit,10)||20));
    let q={};
    if(category && category!=='all') q.category=category;
    if(search) q.name={$regex:search.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),$options:'i'};
    const minimum=minPrice===''||minPrice===undefined?undefined:Number(minPrice);
    const maximum=maxPrice===''||maxPrice===undefined?undefined:Number(maxPrice);
    if((minimum!==undefined&&!Number.isFinite(minimum))||(maximum!==undefined&&!Number.isFinite(maximum)))return res.status(400).json({success:false,message:'Price filters must be valid numbers'});
    if(minimum!==undefined||maximum!==undefined) q.price={...(minimum!==undefined?{$gte:minimum}:{}),...(maximum!==undefined?{$lte:maximum}:{})};
    const skip=(pageNumber-1)*pageSize;
    const total=await Product.countDocuments(q);
    const list=await Product.find(q).sort({[sortField]:order==='asc'?1:-1}).skip(skip).limit(pageSize);
    res.json({success:true,message:'Products fetched successfully',total,pages:Math.ceil(total/pageSize),page:pageNumber,products:list});
  }catch(e){next(e)}
});
router.get('/mine',protect,allow('Seller'),async(req,res,next)=>{
  try{
    const products=await Product.find({sellerId:req.user.id}).sort({updatedAt:-1}).limit(100);
    res.json({success:true,products});
  }catch(e){next(e)}
});
router.get('/:id',async(req,res,next)=>{
  if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({success:false,message:'Invalid product id'});
  try{
    const product=await Product.findById(req.params.id);
    if(!product)return res.status(404).json({success:false,message:'Product not found'});
    res.json({success:true,product});
  }catch(e){next(e)}
});
router.get('/combo/:id',async(req,res,next)=>{
  try{const main=await Product.findById(req.params.id);if(!main) return res.status(404).json({success:false,message:'Not found'});
  const perfect=await Product.find({_id:{$ne:main._id},comboTags:{$in:main.comboTags}}).limit(8);
  res.json({success:true,message:'Perfect combo found successfully',main:main.name,perfect});}
  catch(e){next(e)}
});
router.put('/stock/:id',protect,allow('Admin','Seller'),body('stock').isInt({min:0}).toInt(),validate,async(req,res,next)=>{try{
  const filter={_id:req.params.id};if(req.user.role!=='Admin')filter.sellerId=req.user.id;
  const p=await Product.findOneAndUpdate(filter,{stock:Number(req.body.stock)},{new:true,runValidators:true});
  if(!p)return res.status(404).json({success:false,message:'Product not found'});
  res.json({success:true,message:'Stock updated successfully',product:p});
}catch(e){next(e)}});
router.delete('/:id',protect,allow('Admin','Seller'),async(req,res,next)=>{try{
  const filter={_id:req.params.id};if(req.user.role!=='Admin')filter.sellerId=req.user.id;
  const p=await Product.findOneAndDelete(filter);if(!p)return res.status(404).json({success:false,message:'Product not found'});
  res.json({success:true,message:'Product deleted successfully'});
}catch(e){next(e)}});
router.post('/seed',protect,allow('Admin'),async(req,res,next)=>{try{
  const existingCount=await Product.countDocuments();
  if(existingCount>=150)return res.json({success:true,message:'Catalog already meets the minimum size',count:existingCount});
  const demo=[
    {name:'iPhone 15',category:'Mobile',subcategory:'iPhone',price:79900,stock:20,brand:'Apple',comboTags:['iphone','cover','adapter']},
    {name:'Samsung Galaxy A55',category:'Mobile',subcategory:'Android Phone',price:39999,stock:30,brand:'Samsung',comboTags:['android','cover','charger']},
    {name:'Nokia 110 Button Phone',category:'Mobile',subcategory:'Button Phone',price:1999,stock:100,brand:'Nokia',comboTags:['buttonphone','charger']},
    {name:'AirPods Pro',category:'AudioPower',subcategory:'Earbuds',price:24900,stock:40,brand:'Apple',comboTags:['iphone','earbuds']},
    {name:'20W Adapter',category:'AudioPower',subcategory:'Adapter',price:1999,stock:80,brand:'Apple',comboTags:['iphone','adapter']},
    {name:'Type-C Cable 1M',category:'AudioPower',subcategory:'Charging Cable',price:799,stock:150,brand:'boAt',comboTags:['cable','charger']},
    {name:'65W Laptop Charger',category:'Computing',subcategory:'Laptop Charger',price:2499,stock:60,brand:'HP',comboTags:['laptop','charger']},
    {name:'HP Laptop 15s',category:'Computing',subcategory:'Laptop',price:55990,stock:15,brand:'HP',comboTags:['laptop','pendrive']},
    {name:'Pendrive 128GB',category:'Storage',subcategory:'Pendrive',price:1299,stock:200,brand:'SanDisk',comboTags:['laptop','pendrive']},
    {name:'Memory Card 64GB',category:'Storage',subcategory:'Memory Card',price:899,stock:180,brand:'Samsung',comboTags:['android','memorycard']},
    {name:'iPhone Cover',category:'Protection',subcategory:'Mobile Cover',price:999,stock:120,brand:'Spigen',comboTags:['iphone','cover']},
    {name:'Aviator Sunglasses',category:'Lifestyle',subcategory:'Sunglasses',price:1999,stock:70,brand:'RayBan',comboTags:['sunglasses']},
    {name:'Leather Belt',category:'Lifestyle',subcategory:'Belt',price:899,stock:90,brand:'Woodland',comboTags:['belt']},
    {name:'Eye Glasses Bluecut',category:'Lifestyle',subcategory:'Eye Glasses',price:1499,stock:50,brand:'Lenskart',comboTags:['eyeglasses']},
  ];
  if(existingCount===0)await Product.insertMany(demo);
  const source=await Product.find().limit(50).lean();
  if(!source.length)return res.status(400).json({success:false,message:'Add at least one product before expanding the catalog'});
  const startingCount=existingCount||demo.length;
  const variantNames=['Midnight','Ocean Blue','Silver','Graphite','Forest Green','Rose'];
  const additions=Array.from({length:150-startingCount},(_,index)=>{
    const base=source[index%source.length];
    const edition=Math.floor(index/source.length)+1;
    return {
      name:`${base.name} ${variantNames[index%variantNames.length]} Edition ${edition}`,
      category:base.category,subcategory:base.subcategory,brand:base.brand,
      price:Math.max(99,Math.round(Number(base.price)*(.9+(index%13)/100))),
      stock:Math.max(0,Number(base.stock)||0),comboTags:base.comboTags||[],image:base.image
    };
  });
  await Product.insertMany(additions);
  res.json({success:true,message:'Catalog expanded to the 150-product minimum',count:startingCount+additions.length});
}catch(e){next(e)}});
module.exports=router;
