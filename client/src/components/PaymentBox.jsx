import {useState} from 'react';
export default function PaymentBox({total=5000}){
  const [m,setM]=useState('UPI');const [done,setDone]=useState(false);
  const emi=Math.round(total/12);
  const pay=()=>{setDone(true);alert('✓ Payment successful via '+m+'! Order confirmed');};
  if(done) return (<div style={{background:'#e8f5e9',padding:20,borderRadius:10,textAlign:'center'}}><div style={{fontSize:40}}>✅</div><h3>Payment Successful!</h3><p>₹{total.toLocaleString('en-IN')} paid via {m}</p><button onClick={()=>alert('✓ Invoice PDF downloaded')} style={{padding:'8px 16px',background:'#1a237e',color:'#fff',border:'none',borderRadius:6}}>Download Invoice PDF ✓</button></div>);
  return (<div style={{background:'#fff',padding:15,borderRadius:10,border:'1px solid #ddd'}}>
    <h3>💳 Payment</h3>
    {['UPI','Card','EMI','COD'].map(x=><label key={x} style={{marginRight:12}}><input type="radio" checked={m===x} onChange={()=>setM(x)}/> {x}</label>)}
    {m==='EMI'&&<div style={{background:'#fff3e0',padding:10,borderRadius:8,marginTop:8}}>💳 EMI: ₹{emi.toLocaleString('en-IN')}/mo x 12 = ₹{total.toLocaleString('en-IN')} <b style={{color:'green'}}>No Cost ✓</b></div>}
    {m==='UPI'&&<input placeholder="UPI ID: name@upi" style={{width:'100%',padding:8,marginTop:8,borderRadius:6,border:'1px solid #ccc'}}/>}
    <div style={{marginTop:10,fontWeight:'bold'}}>Total: ₹{total.toLocaleString('en-IN')}</div>
    <button onClick={pay} style={{width:'100%',padding:12,background:'#00c853',color:'#fff',border:'none',borderRadius:8,marginTop:8,fontWeight:'bold'}}>Pay ₹{total.toLocaleString('en-IN')} ✓</button>
  </div>);
}
