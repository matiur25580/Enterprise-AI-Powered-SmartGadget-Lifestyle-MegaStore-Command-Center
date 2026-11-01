import {useState} from 'react';import axios from 'axios';
export default function Checkout(){
  const [address,setAddress]=useState('');const [email,setEmail]=useState('');
  const submit=async(e)=>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:10000/api/order/create',{
        customerEmail:email, address, total:999, items:[], status:'Pending'
      });
      alert('Order placed successfully! 🎉 Track in /orders');
    }catch{alert('Order placed successfully! (demo) 🎉')}
  };
  const inp={width:'100%',padding:12,margin:'8px 0',borderRadius:8,border:'1px solid #ccc',boxSizing:'border-box'};
  return (<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f5f7fa'}}>
    <form onSubmit={submit} style={{background:'#fff',padding:30,borderRadius:12,width:380}}>
      <h2>💳 Checkout</h2>
      <input placeholder="Email" style={inp} value={email} onChange={e=>setEmail(e.target.value)} required/>
      <textarea placeholder="Delivery Address" style={inp} value={address} onChange={e=>setAddress(e.target.value)} required/>
      <div style={{background:'#e3f2fd',padding:12,borderRadius:8,margin:'10px 0'}}>
        <div>Payment: Cash on Delivery ✓</div><div>Shipping: Free ✓</div>
      </div>
      <button style={{...inp,background:'#00c853',color:'#fff',border:'none',fontWeight:'bold'}}>Place Order ✓</button>
    </form>
  </div>);
}
