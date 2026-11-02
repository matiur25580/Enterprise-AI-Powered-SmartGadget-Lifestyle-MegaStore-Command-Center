import {Link} from 'react-router-dom';import {useStore} from '../../context/StoreContext.jsx';import {useState} from 'react';
import {toast} from '../../utils/notifications.jsx';
export default function AddressBook(){
  const {addrs,setAddrs}=useStore();const [f,setF]=useState({label:'',name:'',phone:'',pin:'',addr:''});
  const add=()=>{if(!f.label||!f.pin)return toast.error('Enter an address label and PIN code.');setAddrs([...addrs,{...f,id:Date.now()}]);setF({label:'',name:'',phone:'',pin:'',addr:''});toast.success('Address saved successfully.');};
  return (<div style={{padding:20,maxWidth:700,margin:'0 auto',fontFamily:'sans-serif'}}>
    <Link to="/shop">← Shop</Link><h2>📍 Delivery Addresses</h2>
    {addrs.map(a=><div key={a.id} style={{border:'1px solid #ddd',borderRadius:10,padding:12,margin:'8px 0',display:'flex',justifyContent:'space-between'}}>
      <div><b>{a.label}</b> - {a.name}<br/><small>{a.addr}, PIN: {a.pin}, 📞 {a.phone}</small></div>
      <button onClick={()=>{setAddrs(addrs.filter(x=>x.id!==a.id));toast.success('Address deleted.')}} style={{background:'#ffebee',border:'none',borderRadius:6,padding:'6px 10px'}}>🗑️</button>
    </div>)}
    <h3>Add New Address</h3>
    {['label (Home/Office)','name','phone','pin','addr'].map(k=><input key={k} placeholder={k} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} style={{width:'100%',padding:10,margin:'6px 0',borderRadius:8,border:'1px solid #ccc'}}/>)}
    <button onClick={add} style={{width:'100%',padding:12,background:'#2a5298',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Save Address ✓</button>
  </div>);
}
