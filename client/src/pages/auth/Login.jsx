import {useState} from 'react';import {Link,useNavigate} from 'react-router-dom';import axios from 'axios';import {useThemeDate,inputStyle,showSuccess,showError} from './AuthLayout.jsx';
export default function Login(){
  const {dark,setDark,date,time}=useThemeDate();const nav=useNavigate();
  const [f,setF]=useState({emailOrId:'',password:'',role:''});const [showPw,setShowPw]=useState(false);
  const roles=['Admin','Seller','Customer','DeliveryAgent','SupportAgent','MarketingManager'];
  const submit=async(e)=>{e.preventDefault();if(!f.role) return showError('Please select your role');
    try{const r=await axios.post('http://localhost:10000/api/auth/login',f);showSuccess(r.data.message+' | ID: '+r.data.uniqueId);nav('/shop');}
    catch(err){showError(err.response?.data?.message||'Login failed')}};
  const inp=inputStyle(dark);
  return (<div style={{minHeight:'100vh',background:dark?'#121212':'linear-gradient(135deg,#1e3c72,#2a5298)',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
    <form onSubmit={submit} style={{background:dark?'#1e1e1e':'#fff',color:dark?'#fff':'#000',padding:32,borderRadius:16,width:380,boxShadow:'0 8px 30px rgba(0,0,0,.2)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><h2>🛒 MegaStore Login</h2><button type="button" onClick={()=>setDark(!dark)} style={{padding:'6px 12px',borderRadius:15,border:'none'}}>{dark?'☀️':'🌙'}</button></div>
      <div style={{fontSize:12,opacity:.7,textAlign:'center',marginBottom:10}}>{date} | {time}</div>
      <select value={f.role} onChange={e=>setF({...f,role:e.target.value})} style={inp}><option value="">Select your role</option>{roles.map(r=><option key={r} value={r}>{r}</option>)}</select>
      <input placeholder="Email or Unique ID" style={inp} value={f.emailOrId} onChange={e=>setF({...f,emailOrId:e.target.value})} required/>
      <div style={{position:'relative'}}><input placeholder="Password" type={showPw?'text':'password'} style={inp} value={f.password} onChange={e=>setF({...f,password:e.target.value})} required/>
      <span onClick={()=>setShowPw(!showPw)} style={{position:'absolute',right:12,top:20,cursor:'pointer'}}>👁️</span></div>
      <button style={{...inp,background:'#2a5298',color:'#fff',fontWeight:'bold',border:'none'}}>Login ✓</button>
      <div style={{textAlign:'center',fontSize:14}}><Link to="/forgot-password">Forgot Password?</Link> | <Link to="/register"> Register</Link> | <Link to="/"> Home</Link></div>
    </form></div>);
}
