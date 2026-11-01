import {useState} from 'react';import {Link} from 'react-router-dom';import axios from 'axios';
export default function Login(){
  const [f,setF]=useState({emailOrId:'',password:'',role:''});
  const roles=['Admin','Seller','Customer','DeliveryAgent','SupportAgent','MarketingManager'];
  const submit=async(e)=>{e.preventDefault();if(!f.role) return alert('Select role');
    try{const r=await axios.post('http://localhost:10000/api/auth/login',f);alert('Login successful! '+r.data.fullName);}catch{alert('Login failed')}};
  const inp={width:'100%',padding:12,margin:'8px 0',borderRadius:8,border:'1px solid #ccc',boxSizing:'border-box'};
  return (<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#1e3c72,#2a5298)'}}>
    <form onSubmit={submit} style={{background:'#fff',padding:30,borderRadius:15,width:350}}>
      <h2 style={{textAlign:'center'}}>🛒 MegaStore Login</h2>
      <select value={f.role} onChange={e=>setF({...f,role:e.target.value})} style={inp}><option value="">Select role</option>{roles.map(r=><option key={r} value={r}>{r}</option>)}</select>
      <input placeholder="Email or Unique ID" style={inp} value={f.emailOrId} onChange={e=>setF({...f,emailOrId:e.target.value})} required/>
      <input placeholder="Password" type="password" style={inp} value={f.password} onChange={e=>setF({...f,password:e.target.value})} required/>
      <button style={{...inp,background:'#2a5298',color:'#fff',border:'none',fontWeight:'bold'}}>Login</button>
      <p style={{textAlign:'center'}}><Link to="/register">Register</Link> | <Link to="/">Home</Link></p>
    </form></div>);
}
