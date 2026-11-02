import {useEffect,useState} from 'react';import {Link,useNavigate} from 'react-router-dom';import axios from 'axios';import './auth.css';
export default function Login(){
  const [dark,setDark]=useState(false);const [now,setNow]=useState(new Date());
  const [f,setF]=useState({emailOrId:'',password:'',role:''});const [showPw,setShowPw]=useState(false);
  const nav=useNavigate();
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t)},[]);
  const dd=String(now.getDate()).padStart(2,'0'),mm=String(now.getMonth()+1).padStart(2,'0'),h12=now.getHours()%12||12,ap=now.getHours()>=12?'PM':'AM';
  const date=`${dd}.${mm}.${now.getFullYear()}`,time=`${String(h12).padStart(2,'0')}.${String(now.getMinutes()).padStart(2,'0')}.${String(now.getSeconds()).padStart(2,'0')} ${ap}`;
  const submit=async(e)=>{e.preventDefault();if(!f.role) return alert('✕ Please select your role');
    try{const r=await axios.post('https://enterprise-ai-powered-smartgadget.onrender.com/api/auth/login',f);localStorage.setItem('ms_auth',JSON.stringify({token:r.data.token,role:r.data.role,email:r.data.email,fullName:r.data.fullName}));alert('✓ '+r.data.message);nav('/shop');}catch(err){alert('✕ '+(err.response?.data?.message||'Login failed'))}};
  return (<div className="auth-bg"><form onSubmit={submit} className={'auth-card'+(dark?' dark':'')}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><h2>🛒 MegaStore</h2><button type="button" onClick={()=>setDark(!dark)} style={{padding:'6px 12px',borderRadius:15,border:'none'}}>{dark?'☀️':'🌙'}</button></div>
    <div style={{fontSize:12,opacity:.6,textAlign:'center'}}>{date} | {time}</div>
    <select className="auth-input" value={f.role} onChange={e=>setF({...f,role:e.target.value})}><option value="">Select your role</option>{['Admin','Seller','Customer','DeliveryAgent','SupportAgent','MarketingManager'].map(r=><option key={r} value={r}>{r}</option>)}</select>
    <input className="auth-input" placeholder="Email or Unique ID" value={f.emailOrId} onChange={e=>setF({...f,emailOrId:e.target.value})} required/>
    <div style={{position:'relative'}}><input className="auth-input" placeholder="Password" type={showPw?'text':'password'} value={f.password} onChange={e=>setF({...f,password:e.target.value})} required/><span onClick={()=>setShowPw(!showPw)} style={{position:'absolute',right:12,top:20,cursor:'pointer'}}>👁️</span></div>
    <button className="auth-btn auth-btn-primary">Login ✓</button>
    <div style={{textAlign:'center',fontSize:14}}><Link to="/forgot-password">Forgot Password?</Link> | <Link to="/register">Register</Link> | <Link to="/">Home</Link></div>
  </form></div>);
}
