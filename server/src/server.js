const express=require('express');const mongoose=require('mongoose');const cors=require('cors');require('dotenv').config();
const app=express();
const allowedOrigins=(process.env.CLIENT_URL||'http://localhost:5173').split(',').map(origin=>origin.trim()).filter(Boolean);
app.use(cors({origin:(origin,callback)=>{
	if(!origin||allowedOrigins.includes(origin))return callback(null,true);
	callback(new Error('Origin not allowed'));
}}));
app.use(express.json());
app.use('/api/upload', require('./routes/upload'));
app.use('/uploads', express.static('uploads'));;
app.get('/',(req,res)=>res.json({message:'MegaStore Enterprise API Running',version:'2.0'}));
app.get('/health',(req,res)=>res.json({success:true,message:'Health check successful',uptime:process.uptime()}));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/product',require('./routes/product'));
app.use('/api/order',require('./routes/order'));
app.use('/api/extra',require('./routes/extra'));
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('MongoDB Connected')).catch(e=>console.log('DB Error:'+e.message));
app.listen(process.env.PORT||10000,()=>console.log('Enterprise Server on '+(process.env.PORT||10000)));
