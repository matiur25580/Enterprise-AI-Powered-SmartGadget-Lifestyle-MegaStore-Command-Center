import {useState} from 'react';import {Link} from 'react-router-dom';import axios from 'axios';import './auth.css';
export default function ForgotPassword(){
  const [dark,setDark]=useState(false);const [step,setStep]=useState(1);const [f,setF]=useState({email:'',role:'',otp:'',newPassword:''});
  const send=async(e)=>{e.preventDefault();try{await axios.post('http://localhost:10000/api/auth/forgot-password',{email:f.email,role:f.role});setStep(2);alert('✓ Reset OTP sent successfully');}catch(err){alert('✕ '+(err.response?.data?.message||'Failed'))}};
  const reset=async(e)=>{e.preventDefault();try{const r=await axios.post('http://localhost:10000/api/auth/reset-password',f);alert('✓ '+r.data.message);setStep(3);}catch(err){alert('✕ '+(err.response?.data?.message||'Failed'))}};
  return (<div className="auth-bg"><div className={'auth-card'+(dark?' dark':'')}>
    <div style={{display:'flex',justifyContent:'space-between'}}><h2>🔑 Forgot Password</h2><button onClick={()=>setDark(!dark)} style={{padding:'6px 12px',borderRadius:15,border:'none'}}>{dark?'☀️':'🌙'}</button></div>
    <div className="step-dots"><div className={'step-dot '+(step>=1?'done':'')}>1</div><div className={'step-dot '+(step===2?'active':step>2?'done':'')}>2</div><div className={'step-dot '+(step===3?'done':'')}>✓</div></div>
    {step===1&&<form onSubmit={send}><select className="auth-input" value={f.role} onChange={e=>setF({...f,role:e.target.value})}><option value="">Select role</option>{['Admin','Seller','Customer','DeliveryAgent','SupportAgent','MarketingManager'].map(r=><option key={r} value={r}>{r}</option>)}</select><input className="auth-input" placeholder="Registered Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})} required/><button className="auth-btn auth-btn-primary">Send Reset OTP ✓</button></form>}
    {step===2&&<form onSubmit={reset}><div style={{background:'#e8f5e9',padding:10,borderRadius:8,marginBottom:10,fontSize:13,color:'#000'}}>✓ OTP sent to {f.email}</div><input className="auth-input" placeholder="6-digit OTP" value={f.otp} onChange={e=>setF({...f,otp:e.target.value})} required/><input className="auth-input" placeholder="New Password" type="password" value={f.newPassword} onChange={e=>setF({...f,newPassword:e.target.value})} required/><button className="auth-btn" style={{background:'#00c853',color:'#fff'}}>Reset Password ✓</button></form>}
    {step===3&&<div style={{textAlign:'center'}}><div style={{fontSize:50}}>✅</div><h3>Reset Successful!</h3><Link to="/login" className="auth-btn auth-btn-primary" style={{display:'block',textDecoration:'none',textAlign:'center'}}>Go to Login ✓</Link></div>}
    <div style={{textAlign:'center',marginTop:10}}><Link to="/login">Back to Login</Link></div>
  </div></div>);
}
