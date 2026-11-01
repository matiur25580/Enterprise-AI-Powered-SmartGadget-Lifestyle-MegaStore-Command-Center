const express=require('express');const mongoose=require('mongoose');const cors=require('cors');require('dotenv').config();
const app=express();app.use(cors());app.use(express.json());
app.get('/',(req,res)=>res.json({message:'MegaStore API Running'}));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/product',require('./routes/product'));
app.use('/api/order',require('./routes/order'));
app.use('/api/extra',require('./routes/extra'));
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('MongoDB Connected')).catch(e=>console.log('DB Error:'+e.message));
app.listen(process.env.PORT||10000,()=>console.log('Server on port '+(process.env.PORT||10000)));
