import {useState} from 'react';import {Link} from 'react-router-dom';import axios from 'axios';import {useThemeDate,inputStyle,showSuccess,showError} from './AuthLayout.jsx';
export default function ForgotPassword(){
  const {dark,setDark,date,time}=useThemeDate();
  const [step,setStep]=useState(1);
  const [f,setF]=useState({email:'',role:'',otp:'',newPassword:''});
  const roles=['Admin','Seller','Customer','DeliveryAgent','SupportAgent','MarketingManager'];
  const send=async(e)=>{e.preventDefault();
    try{await axios.post('http://localhost:10000/api/auth/forgot-password',{email:f.email,role:f.role});setStep(2);showSuccess('Password reset OTP sent successfully to your email');}
    catch(err){showError(err.response?.data?.message||'Failed')}};
  const reset=async(e)=>{e.preventDefault();
    try{const r=await axios.post('http://localhost:10000/api/auth/reset-password',f);showSuccess(r.data.message);setStep(3);}catch(err){showError(err.response?.data?.message||'Reset failed')}};
  const inp=inputStyle(dark);
  return (<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:dark?'#121212':'linear-gradient(135deg,#ff6f00,#ff8f00)',padding:20}}>
    <div style={{background:dark?'#1e1e1e':'#fff',color:dark?'#fff':'#000',padding:32,borderRadius:16,width:380}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><h2>🔑 Forgot Password</h2><button onClick={()=>setDark(!dark)} style={{padding:'6px 12px',borderRadius:15,border:'none'}}>{dark?'☀️':'🌙'}</button></div>
      <div style={{fontSize:12,opacity:.7,textAlign:'center',marginBottom:10}}>{date} | {time}</div>
      {step===1 && <form onSubmit={send}>
        <select style={inp} value={f.role} onChange={e=>setF({...f,role:e.target.value})}><option value="">Select your role</option>{roles.map(r=><option key={r} value={r}>{r}</option>)}</select>
        <input placeholder="Registered Email" style={inp} value={f.email} onChange={e=>setF({...f,email:e.target.value})} required/>
        <button style={{...inp,background:'#ff6f00',color:'#fff',fontWeight:'bold',border:'none'}}>Send Reset OTP ✓</button>
      </form>}
      {step===2 && <form onSubmit={reset}>
        <div style={{background:'#e8f5e9',padding:10,borderRadius:8,marginBottom:10,fontSize:13, color:'#000'}}>✓ OTP sent to {f.email}</div>
        <input placeholder="6-digit OTP" style={inp} value={f.otp} onChange={e=>setF({...f,otp:e.target.value})} required/>
        <input placeholder="New Password" type="password" style={inp} value={f.newPassword} onChange={e=>setF({...f,newPassword:e.target.value})} required/>
        <button style={{...inp,background:'#00c853',color:'#fff',fontWeight:'bold',border:'none'}}>Reset Password ✓</button>
      </form>}
      {step===3 && <div style={{textAlign:'center',padding:20}}><div style={{fontSize:50}}>✅</div><h3>Password Reset Successful!</h3><p>Please login with new password</p><Link to="/login" style={{background:'#2a5298',color:'#fff',padding:'10px 20px',borderRadius:8,textDecoration:'none'}}>Go to Login ✓</Link></div>}
      <div style={{textAlign:'center',marginTop:10}}><Link to="/login">Back to Login</Link></div>
    </div></div>);
}
