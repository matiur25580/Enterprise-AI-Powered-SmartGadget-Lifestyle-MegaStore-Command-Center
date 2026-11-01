const nodemailer=require('nodemailer');
module.exports=async(to,otp)=>{
  const t=nodemailer.createTransport({service:'gmail',auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}});
  await t.sendMail({from:process.env.EMAIL_USER,to,subject:'MegaStore OTP',text:`Your OTP is ${otp}. Valid for 5 minutes.`});
};
