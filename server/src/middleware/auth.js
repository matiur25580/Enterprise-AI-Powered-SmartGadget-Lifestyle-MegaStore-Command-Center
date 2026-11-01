const jwt=require('jsonwebtoken');
exports.protect=(req,res,next)=>{
  try{
    const h=req.headers.authorization;
    if(!h) return res.status(401).json({success:false,message:'No token'});
    const token=h.split(' ')[1];
    const d=jwt.verify(token,process.env.JWT_SECRET);
    req.user=d; next();
  }catch(e){res.status(401).json({success:false,message:'Invalid token'})}
};
exports.allow=(...roles)=>(req,res,next)=>{
  if(!roles.includes(req.user.role)) return res.status(403).json({success:false,message:'Access denied for '+req.user.role});
  next();
};
