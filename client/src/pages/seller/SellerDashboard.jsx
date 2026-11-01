import {useState} from 'react';import {Link} from 'react-router-dom';
import SellerChat from '../../components/SellerChat.jsx';import StockAlert from '../../components/StockAlert.jsx';
const init=[{_id:'1',name:'iPhone 15',price:66999,stock:3},{_id:'2',name:'Galaxy A55',price:39999,stock:25},{_id:'3',name:'AirPods Pro',price:19999,stock:4}];
export default function SellerDashboard(){
  const [prods,setProds]=useState(init);const [edit,setEdit]=useState(null);
  const del=(id)=>{if(confirm('Delete?')){setProds(prods.filter(p=>p._id!==id));alert('✓ Product deleted successfully')}};
  const save=()=>{setProds(prods.map(p=>p._id===edit._id?edit:p));setEdit(null);alert('✓ Product updated successfully')};
  return (<div style={{padding:20,maxWidth:900,margin:'0 auto',fontFamily:'sans-serif'}}>
    <Link to="/">← Home</Link><h2>🏪 Seller Dashboard</h2>
    <div style={{background:'#ffebee',padding:12,borderRadius:8,marginBottom:12}}>
      <b>⚠️ Low Stock Alert ({prods.filter(p=>p.stock<5).length})</b>
      {prods.filter(p=>p.stock<5).map(p=><div key={p._id} style={{fontSize:13}}>🔴 {p.name} - only {p.stock} left! <button onClick={()=>setProds(prods.map(x=>x._id===p._id?{...x,stock:x.stock+20}:x))} style={{marginLeft:8,padding:'4px 8px',background:'#00c853',color:'#fff',border:'none',borderRadius:4}}>Restock +20 ✓</button></div>)}
    </div>
    {prods.map(p=><div key={p._id} style={{border:'1px solid #ddd',borderRadius:8,padding:12,margin:'8px 0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div><b>{p.name}</b><br/><small>₹{p.price.toLocaleString('en-IN')} | Stock: <b style={{color:p.stock<5?'red':'green'}}>{p.stock}</b></small></div>
      <div style={{display:'flex',gap:6}}><button onClick={()=>setEdit({...p})} style={{padding:'6px 12px',background:'#2196f3',color:'#fff',border:'none',borderRadius:6}}>Edit ✏️</button><button onClick={()=>del(p._id)} style={{padding:'6px 12px',background:'#f44336',color:'#fff',border:'none',borderRadius:6}}>Delete 🗑️</button></div>
    </div>)}
    {edit&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100}}>
      <div style={{background:'#fff',padding:20,borderRadius:12,width:320}}>
        <h3>Edit Product</h3>
        <input value={edit.name} onChange={e=>setEdit({...edit,name:e.target.value})} style={{width:'100%',padding:8,margin:'6px 0',borderRadius:6,border:'1px solid #ccc'}}/>
        <input type="number" value={edit.price} onChange={e=>setEdit({...edit,price:+e.target.value})} style={{width:'100%',padding:8,margin:'6px 0',borderRadius:6,border:'1px solid #ccc'}}/>
        <input type="number" value={edit.stock} onChange={e=>setEdit({...edit,stock:+e.target.value})} style={{width:'100%',padding:8,margin:'6px 0',borderRadius:6,border:'1px solid #ccc'}}/>
        <div style={{display:'flex',gap:8}}><button onClick={save} style={{flex:1,padding:10,background:'#00c853',color:'#fff',border:'none',borderRadius:6}}>Save ✓</button><button onClick={()=>setEdit(null)} style={{flex:1,padding:10,background:'#ccc',border:'none',borderRadius:6}}>Cancel</button></div>
      </div>
    </div>}
  <SellerChat/><StockAlert/></div>);
}
