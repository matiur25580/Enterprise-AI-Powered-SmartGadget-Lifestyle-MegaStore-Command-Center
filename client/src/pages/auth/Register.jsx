import {useState,useEffect} from 'react';import {Link} from 'react-router-dom';import axios from 'axios';import './auth.css';
import {toast} from '../../utils/notifications.jsx';
export default function Register(){
  const [dark,setDark]=useState(false);const [now,setNow]=useState(new Date());
  const [f,setF]=useState({fullName:'',email:'',contact:'',dob:'',password:'',confirm:'',role:''});
  const [otpArr,setOtpArr]=useState(['','','','','','']);const [step,setStep]=useState(1);const [done,setDone]=useState(null);
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t)},[]);
  const date=`${String(now.getDate()).padStart(2,'0')}.${String(now.getMonth()+1).padStart(2,'0')}.${now.getFullYear()}`;
  const sendOtp=async()=>{if(!f.email||!f.role)return toast.error('Enter your email and select an account type.');if(f.password!==f.confirm)return toast.error('Your passwords don’t match.');
    const loadingToast=toast.loading('Sending your verification code…');
    try{await axios.post('https://enterprise-ai-powered-smartgadget.onrender.com/api/auth/send-otp',{email:f.email,role:f.role});setStep(2);toast.success('Verification code sent. It’s valid for 5 minutes.',{id:loadingToast});}catch{toast.error('We couldn’t send your verification code. Please try again.',{id:loadingToast});}};
  const submit=async(e)=>{e.preventDefault();const loadingToast=toast.loading('Creating your account…');try{const r=await axios.post('https://enterprise-ai-powered-smartgadget.onrender.com/api/auth/register',{...f,otp:otpArr.join('')});setDone(r.data);setStep(3);toast.success('Your account is ready.',{id:loadingToast});}catch{toast.error('We couldn’t complete registration. Check your details and code.',{id:loadingToast});}};
  if(done) return (<div className="auth-bg"><div className="auth-card" style={{textAlign:'center'}}><div style={{fontSize:50}}>🎉</div><h2>Welcome {done.fullName}!</h2><div style={{background:'#e3f2fd',padding:15,borderRadius:10,margin:'15px 0'}}><small>Your Unique ID</small><h2 style={{color:'#1565c0'}}>{done.uniqueId}</h2><small>⚠️ Save kore rakho</small></div><Link to="/login" className="auth-btn auth-btn-primary" style={{display:'block',textDecoration:'none',textAlign:'center'}}>Go to Login ✓</Link></div></div>);
  return (<div className="auth-bg"><form onSubmit={submit} className={'auth-card'+(dark?' dark':'')}>
    <div style={{display:'flex',justifyContent:'space-between'}}><h2>📝 Register</h2><button type="button" onClick={()=>setDark(!dark)} style={{padding:'6px 12px',borderRadius:15,border:'none'}}>{dark?'☀️':'🌙'}</button></div>
    <div className="step-dots"><div className={'step-dot '+(step>=1?'done':'')}>1</div><div className={'step-dot '+(step===2?'active':step>2?'done':'')}>2</div><div className={'step-dot '+(step===3?'done':'')}>3</div></div>
    <div style={{fontSize:11,textAlign:'center',opacity:.6}}>Step {step}: {step===1?'Details':step===2?'Verify OTP':'Done'} | {date}</div>
    {step===1&&<><select className="auth-input" value={f.role} onChange={e=>setF({...f,role:e.target.value})}><option value="">Select your role</option>{['Customer','Seller'].map(r=><option key={r} value={r}>{r}</option>)}</select>
    <input className="auth-input" placeholder="Full Name" value={f.fullName} onChange={e=>setF({...f,fullName:e.target.value})} required/>
    <input className="auth-input" placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})} required/>
    <input className="auth-input" placeholder="Contact" value={f.contact} onChange={e=>setF({...f,contact:e.target.value})} required/>
    <input className="auth-input" placeholder="DOB DDMMYYYY" value={f.dob} onChange={e=>setF({...f,dob:e.target.value})} required/>
    <input className="auth-input" placeholder="Password" type="password" value={f.password} onChange={e=>setF({...f,password:e.target.value})} required/>
    <input className="auth-input" placeholder="Confirm Password" type="password" value={f.confirm} onChange={e=>setF({...f,confirm:e.target.value})} required/>
    <button type="button" onClick={sendOtp} className="auth-btn auth-btn-primary">Next: Send OTP →</button></>}
    {step===2&&<><div style={{background:'#e8f5e9',padding:10,borderRadius:8,marginBottom:10,fontSize:13}}>✓ OTP sent to {f.email}</div>
    <div style={{display:'flex',gap:8,justifyContent:'center',margin:'12px 0'}}>{otpArr.map((d,i)=><input key={i} value={d} maxLength={1} onChange={e=>{const n=[...otpArr];n[i]=e.target.value;setOtpArr(n)}} className="auth-input" style={{width:44,textAlign:'center',fontSize:20}}/>)}</div>
    <button className="auth-btn" style={{background:'#00c853',color:'#fff'}}>Verify & Register ✓</button>
    <button type="button" onClick={()=>setStep(1)} style={{background:'none',border:'none',color:'#666'}}>← Back</button></>}
    <div style={{textAlign:'center'}}><Link to="/login">Go to Login</Link></div>
  </form></div>);
}
