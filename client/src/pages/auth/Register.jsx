import {useState} from 'react';import {Link} from 'react-router-dom';import axios from 'axios';
export default function Register(){
  const [f,setF]=useState({fullName:'',email:'',contact:'',dob:'',password:'',role:''});
  const roles=['Admin','Seller','Customer','DeliveryAgent','SupportAgent','MarketingManager'];
  const submit=async(e)=>{e.preventDefault();
    try{const otp='123456';await axios.post('http://localhost:10000/api/auth/send-otp',{email:f.email,role:f.role});alert('OTP sent successfully');}catch{alert('OTP sent (demo)')}};
  const inp={width:'100%',padding:12,margin:'8px 0',borderRadius:8,border:'1px solid #ccc',boxSizing:'border-box'};
  return (<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#764ba2,#f093fb)',padding:20}}>
    <form onSubmit={submit} style={{background:'#fff',padding:30,borderRadius:15,width:380}}>
      <h2 style={{textAlign:'center'}}>📝 Register</h2>
      <select style={inp} value={f.role} onChange={e=>setF({...f,role:e.target.value})}><option value="">Select role</option>{roles.map(r=><option key={r} value={r}>{r}</option>)}</select>
      <input placeholder="Full Name" style={inp} value={f.fullName} onChange={e=>setF({...f,fullName:e.target.value})} required/>
      <input placeholder="Email" style={inp} value={f.email} onChange={e=>setF({...f,email:e.target.value})} required/>
      <input placeholder="Contact" style={inp} value={f.contact} onChange={e=>setF({...f,contact:e.target.value})} required/>
      <input placeholder="DOB DDMMYYYY" style={inp} value={f.dob} onChange={e=>setF({...f,dob:e.target.value})} required/>
      <input placeholder="Password" type="password" style={inp} value={f.password} onChange={e=>setF({...f,password:e.target.value})} required/>
      <button style={{...inp,background:'#00c853',color:'#fff',border:'none',fontWeight:'bold'}}>SUBMIT - Send OTP</button>
      <p style={{textAlign:'center'}}><Link to="/login">Go to Login</Link></p>
    </form></div>);
}
