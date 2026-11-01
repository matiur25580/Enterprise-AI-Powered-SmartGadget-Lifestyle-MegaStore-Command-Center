import {Link} from 'react-router-dom';import {useStore} from '../../context/StoreContext.jsx';import {useState} from 'react';
export default function Orders(){
  const {orders,returnOrder}=useStore();const [reason,setReason]=useState({});
  return (<div style={{padding:20,maxWidth:900,margin:'0 auto',fontFamily:'sans-serif'}}>
    <Link to="/shop">← Shop</Link><h2>📦 Order History ({orders.length})</h2>
    {orders.length===0?<p style={{textAlign:'center',padding:40}}>No orders yet. <Link to="/shop">Start shopping</Link></p>:
    orders.map(o=><div key={o.id} style={{border:'1px solid #ddd',borderRadius:10,padding:15,margin:'12px 0'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><b>#{o.id}</b><span style={{background:o.status.includes('Return')?'#ffebee':'#e8f5e9',padding:'4px 10px',borderRadius:12,fontSize:12}}>{o.status} ✓</span></div>
      <div style={{fontSize:13,opacity:.7}}>{o.date} | 📍 {o.addr?.label} - {o.addr?.pin}</div>
      <div style={{margin:'8px 0'}}>{o.items.map((p,i)=><span key={i} style={{background:'#f5f5f5',padding:'4px 8px',borderRadius:6,margin:2,display:'inline-block',fontSize:12}}>{p.name}</span>)}</div>
      {!o.status.includes('Return')&&<div style={{display:'flex',gap:8,marginTop:8}}>
        <select value={reason[o.id]||''} onChange={e=>setReason({...reason,[o.id]:e.target.value})} style={{padding:6,borderRadius:6}}><option value="">Return reason...</option><option>Defective</option><option>Wrong item</option><option>Size issue</option><option>Exchange for other</option></select>
        <button onClick={()=>reason[o.id]?returnOrder(o.id,reason[o.id]):alert('Please select reason')} style={{padding:'6px 12px',background:'#ff9800',color:'#fff',border:'none',borderRadius:6}}>Return / Exchange ↩️</button>
      </div>}
    </div>)}
  </div>);
}
