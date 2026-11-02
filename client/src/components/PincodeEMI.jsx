import {useState} from 'react';
import {calculateEmi} from '../utils/commerce.js';
export default function PincodeEMI({price}){
  const [pin,setPin]=useState('');const [msg,setMsg]=useState('');
  const check=()=>{
    if(pin.length!==6) return setMsg('❌ 6 digit pincode dao');
    setMsg(`✓ Delivery to ${pin} in 2-3 days | COD Available`);
  };
  const emi=price?calculateEmi(price,12,0).monthly:0;
  return (<div style={{background:'#fff3e0',padding:12,borderRadius:8,marginTop:10}}>
    <div style={{display:'flex',gap:8}}>
      <input placeholder="Pincode - ex: 700001" value={pin} onChange={e=>setPin(e.target.value)} style={{padding:8,borderRadius:6,border:'1px solid #ccc',flex:1}}/>
      <button onClick={check} style={{padding:'8px 14px',background:'#ff9800',color:'#fff',border:'none',borderRadius:6}}>Check ✓</button>
    </div>
    {msg && <div style={{marginTop:8,fontSize:13}}>{msg}</div>}
    {price>10000 && <div style={{marginTop:8,fontSize:13}}>💳 EMI: ₹{emi.toLocaleString('en-IN')}/month x 12 <b style={{color:'green'}}>✓ No Cost EMI</b></div>}
  </div>);
}
