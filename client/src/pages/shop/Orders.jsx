import {Link} from 'react-router-dom';import {useStore} from '../../context/StoreContext.jsx';import {useState} from 'react';
import LiveMap from '../../components/LiveMap.jsx';import GstInvoice from '../../components/GstInvoice.jsx';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import {toast} from '../../utils/notifications.jsx';
export default function Orders(){
  const {orders,returnOrder,setOrders}=useStore();const [reason,setReason]=useState({});const [cancelId,setCancelId]=useState(null);
  const cancel=()=>{setOrders(orders.map(x=>x.id===cancelId?{...x,status:'Cancelled ✓ Refund in 3-5 days'}:x));setCancelId(null);toast.success('Your order has been cancelled.');};
  return (<div style={{padding:20,maxWidth:900,margin:'0 auto',fontFamily:'sans-serif'}}>
    <Link to="/shop">← Shop</Link><h2>📦 Order History ({orders.length})</h2><LiveMap/><GstInvoice/>
    {orders.length===0?<p style={{textAlign:'center',padding:40}}>No orders yet. <Link to="/shop">Start shopping</Link></p>:
    orders.map(o=><div key={o.id} style={{border:'1px solid #ddd',borderRadius:10,padding:15,margin:'12px 0'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><b>#{o.id}</b><span style={{background:o.status.includes('Cancel')?'#ffebee':o.status.includes('Return')?'#fff3e0':'#e8f5e9',padding:'4px 10px',borderRadius:12,fontSize:12}}>{o.status}</span></div>
      <div style={{fontSize:13,opacity:.7}}>{o.date} | 📍 {typeof o.addr==='string'?o.addr:o.addr?.label||'Address not available'}</div>
      <div style={{margin:'8px 0'}}>{o.items.map((p,i)=><span key={i} style={{background:'#f5f5f5',padding:'4px 8px',borderRadius:6,margin:2,display:'inline-block',fontSize:12}}>{p.name}</span>)}</div>
      {!o.status.includes('Cancel')&&!o.status.includes('Return')&&<div style={{display:'flex',gap:8,marginTop:8,flexWrap:'wrap'}}>
        <button onClick={()=>setCancelId(o.id)} style={{padding:'6px 12px',background:'#f44336',color:'#fff',border:'none',borderRadius:6}}>Cancel Order ✕</button>
        <select value={reason[o.id]||''} onChange={e=>setReason({...reason,[o.id]:e.target.value})} style={{padding:6,borderRadius:6}}><option value="">Return reason...</option><option>Defective</option><option>Wrong item</option><option>Exchange</option></select>
        <button onClick={()=>reason[o.id]?returnOrder(o.id,reason[o.id]):toast.error('Choose a return reason first.')} style={{padding:'6px 12px',background:'#ff9800',color:'#fff',border:'none',borderRadius:6}}>Return ↩️</button>
      </div>}
    </div>)}{cancelId&&<ConfirmDialog title="Cancel this order?" message="Are you sure you want to cancel this order?" confirmLabel="Cancel order" danger onCancel={()=>setCancelId(null)} onConfirm={cancel}/>}
  </div>);
}
