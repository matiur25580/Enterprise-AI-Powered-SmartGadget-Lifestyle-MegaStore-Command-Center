import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {API} from '../../utils/api.js';

function readAuth(){
  try{
    return JSON.parse(localStorage.getItem('ms_auth')||'null');
  }catch{
    return null;
  }
}

export default function Orders(){
  const [orders,setOrders]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const auth=readAuth();

  useEffect(()=>{
    let active=true;
    if(!auth?.token){
      setLoading(false);
      return ()=>{active=false;};
    }
    axios.get(`${API}/api/order/my`,{
      headers:{Authorization:`Bearer ${auth.token}`},
    }).then(response=>{
      if(active)setOrders(response.data.orders||[]);
    }).catch(error=>{
      if(active)setError(error.response?.data?.message||'Your order history could not be loaded.');
    }).finally(()=>{
      if(active)setLoading(false);
    });
    return ()=>{active=false;};
  },[]);

  return (
    <main style={{maxWidth:1000,margin:'0 auto',padding:'clamp(16px,4vw,32px)',fontFamily:'sans-serif'}}>
      <Link to="/shop">← Shop</Link>
      <h1>Order history</h1>
      {!auth?.token&&<p>Sign in with your customer account to see orders. <Link to="/login">Sign in</Link></p>}
      {loading&&<p role="status">Loading your orders…</p>}
      {error&&<p role="alert" style={{color:'#b91c1c'}}>{error}</p>}
      {!loading&&!error&&auth?.token&&orders.length===0&&<p style={{textAlign:'center',padding:40}}>No orders yet. <Link to="/shop">Start shopping</Link></p>}
      {!loading&&orders.map(order=>(
        <article key={order._id} style={{border:'1px solid #dbe3eb',borderRadius:12,padding:16,margin:'12px 0',background:'#fff'}}>
          <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
            <strong>Order #{String(order._id).slice(-8).toUpperCase()}</strong>
            <span style={{padding:'4px 10px',borderRadius:999,background:order.status==='Cancelled'?'#fee2e2':'#dcfce7'}}>{order.status}</span>
          </div>
          <div style={{fontSize:13,color:'#64748b',marginTop:8}}>{order.createdAt?new Date(order.createdAt).toLocaleString('en-IN'):''} · {order.address}</div>
          <ul style={{paddingLeft:20}}>
            {(order.items||[]).map((item,index)=>(
              <li key={`${item.productId}-${index}`} style={{padding:'4px 0'}}>{item.name} × {item.qty} <span style={{color:'#475569'}}>— ₹{(Number(item.price)*Number(item.qty)).toLocaleString('en-IN')}</span></li>
            ))}
          </ul>
          <strong>Total: ₹{Number(order.total||0).toLocaleString('en-IN')}</strong>
        </article>
      ))}
    </main>
  );
}
