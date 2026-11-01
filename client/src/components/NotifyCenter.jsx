import {useState} from 'react';
export default function NotifyCenter(){
  const [open,setOpen]=useState(false);
  const notes=[{t:'🔥 Flash Sale live!',d:'Up to 50% off on mobiles'},{t:'📦 Order shipped',d:'#MS-123456 out for delivery'},{t:'🎟️ New coupon',d:'DIWALI20 - 20% off'}];
  return (<div style={{position:'fixed',top:70,right:15,zIndex:999}}>
    <button onClick={()=>setOpen(!open)} style={{width:45,height:45,borderRadius:'50%',background:'#ff9800',border:'none',fontSize:20}}>🔔<span style={{position:'absolute',background:'red',color:'#fff',borderRadius:'50%',fontSize:10,padding:'2px 5px',marginLeft:-8}}>{notes.length}</span></button>
    {open&&<div style={{position:'absolute',right:0,top:50,width:280,background:'#fff',borderRadius:10,boxShadow:'0 4px 20px rgba(0,0,0,.2)',padding:10,fontFamily:'sans-serif'}}>
      <b>Notifications</b>{notes.map((n,i)=><div key={i} style={{padding:8,borderBottom:'1px solid #eee',fontSize:13}}><b>{n.t}</b><br/><small>{n.d}</small></div>)}
      <div style={{textAlign:'center',padding:6}}><small style={{color:'#2a5298'}}>✓ All caught up</small></div>
    </div>}
  </div>);
}
