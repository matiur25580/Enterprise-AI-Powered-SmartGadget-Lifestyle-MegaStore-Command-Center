import {useState} from 'react';import {Link} from 'react-router-dom';import axios from 'axios';import {useThemeDate,inputStyle,showSuccess,showError} from './AuthLayout.jsx';
export default function Register(){
  const {dark,setDark,date,time}=useThemeDate();
  const [f,setF]=useState({fullName:'',email:'',contact:'',dob:'',password:'',confirm:'',role:''});
  const [otpArr,setOtpArr]=useState(['','','','','','']);const [sent,setSent]=useState(false);const [done,setDone]=useState(null);
  const roles=['Admin','Seller','Customer','DeliveryAgent','SupportAgent','MarketingManager'];
  const sendOtp=async()=>{
    if(!f.email||!f.role) return showError('Email and role required');
    if(f.password!==f.confirm) return showError('Passwords do not match');
    try{await axios.post('http://localhost:10000/api/auth/send-otp',{email:f.email,role:f.role,purpose:'register'});setSent(true);showSuccess('OTP sent successfully to your email - valid 5 min');}catch{showError('OTP send failed')}
  };
  const submit=async(e)=>{e.preventDefault();const otp=otpArr.join('');if(otp.length!==6) return showError('Enter 6-digit OTP');
    try{const r=await axios.post('http://localhost:10000/api/auth/register',{...f,otp});setDone(r.data);showSuccess(r.data.message);}catch(err){showError(err.response?.data?.message||'Failed')}};
  const inp=inputStyle(dark);
  if(done) return (<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:dark?'#121212':'linear-gradient(135deg,#00c853,#009624)'}}>
    <div style={{background:'#fff',padding:40,borderRadius:16,textAlign:'center',maxWidth:400}}>
      <div style={{fontSize:50}}>🎉</div><h2>Welcome {done.fullName}!</h2><p>Role: <b>{done.role}</b></p>
      <div style={{background:'#e3f2fd',padding:15,borderRadius:10,margin:'15px 0'}}><small>Your Unique ID</small><h2 style={{color:'#1565c0'}}>{done.uniqueId}</h2><small>⚠️ Save kore rakho future login er jonno</small></div>
      <Link to="/login" style={{background:'#2a5298',color:'#fff',padding:'12px 24px',borderRadius:8,textDecoration:'none',fontWeight:'bold'}}>Go to Login ✓</Link>
    </div></div>);
  return (<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:dark?'#121212':'linear-gradient(135deg,#764ba2,#f093fb)',padding:20}}>
    <form onSubmit={submit} style={{background:dark?'#1e1e1e':'#fff',color:dark?'#fff':'#000',padding:30,borderRadius:16,width:400}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><h2>📝 Register</h2><button type="button" onClick={()=>setDark(!dark)} style={{padding:'6px 12px',borderRadius:15,border:'none'}}>{dark?'☀️':'🌙'}</button></div>
      <div style={{fontSize:12,opacity:.7,textAlign:'center'}}>{date} | {time}</div>
      <select style={inp} value={f.role} onChange={e=>setF({...f,role:e.target.value})}><option value="">Select your role</option>{roles.map(r=><option key={r} value={r}>{r}</option>)}</select>
      <input placeholder="Full Name" style={inp} value={f.fullName} onChange={e=>setF({...f,fullName:e.target.value})} required/>
      <input placeholder="Email" style={inp} value={f.email} onChange={e=>setF({...f,email:e.target.value})} required/>
      <input placeholder="Contact Number" style={inp} value={f.contact} onChange={e=>setF({...f,contact:e.target.value})} required/>
      <input placeholder="DOB - DDMMYYYY" style={inp} value={f.dob} onChange={e=>setF({...f,dob:e.target.value})} required/>
      <input placeholder="Password" type="password" style={inp} value={f.password} onChange={e=>setF({...f,password:e.target.value})} required/>
      <input placeholder="Confirm Password" type="password" style={inp} value={f.confirm} onChange={e=>setF({...f,confirm:e.target.value})} required/>
      <button type="button" onClick={sendOtp} style={{...inp,background:'#ff9800',color:'#fff',fontWeight:'bold',border:'none'}}>SUBMIT - Send OTP</button>
      {sent && <div><div style={{display:'flex',gap:8,justifyContent:'center',margin:'12px 0'}}>{otpArr.map((d,i)=><input key={i} value={d} maxLength={1} onChange={e=>{const n=[...otpArr];n[i]=e.target.value;setOtpArr(n)}} style={{width:42,height:48,textAlign:'center',fontSize:20,borderRadius:8,border:'1px solid #ccc',background:dark?'#2a2a2a':'#fff',color:dark?'#fff':'#000'}}/>)}</div>
      <button style={{...inp,background:'#00c853',color:'#fff',fontWeight:'bold',border:'none'}}>Verify & Register ✓</button></div>}
      <div style={{textAlign:'center'}}><Link to="/login">Go to Login</Link></div>
    </form></div>);
}
