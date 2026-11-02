import {useState} from 'react';
import {notifyInfo} from '../utils/notifications.jsx';
export default function AISearch(){
  const [q,setQ]=useState('');const [ans,setAns]=useState('');
  const ask=()=>{
    if(!q) return;
    let r='🤖 AI: ';
    if(q.toLowerCase().includes('phone')&&q.match(/(\d+)/)){const b=q.match(/(\d+)/)[1];r+=`Budget ₹${b} te best: Galaxy A55 (₹39999) ba Nokia 110 (₹1999) ✓`;}
    else if(q.toLowerCase().includes('laptop')) r+='HP Laptop 15s (₹55990) tomar jonno perfect. EMI ₹4666/month ✓';
    else if(q.toLowerCase().includes('iphone')) r+='iPhone 15 + Cover + Adapter combo te 15% save hobe ✓';
    else r+='Tomar jonno trending: iPhone 15, AirPods Pro, HP Laptop. Budget bolo, best suggest korbo ✓';
    setAns(r);
  };
  return (<div style={{background:'linear-gradient(135deg,#1a237e,#3949ab)',color:'#fff',padding:15,borderRadius:12,marginBottom:15}}>
    <b>🤖 AI Shopping Assistant</b>
    <div style={{display:'flex',gap:8,marginTop:8}}>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Bolo: "10000 budget e valo phone dao" / Voice 🎤' style={{flex:1,padding:10,borderRadius:8,border:'none'}}/>
      <button onClick={ask} style={{padding:'10px 16px',background:'#00e676',border:'none',borderRadius:8,fontWeight:'bold'}}>Ask ✓</button>
      <button onClick={()=>notifyInfo('Try voice search by saying “Find an iPhone”.')} style={{padding:'10px 14px',background:'#ff9800',border:'none',borderRadius:8}}>🎤</button>
    </div>
    {ans&&<div style={{marginTop:10,background:'rgba(255,255,255,.15)',padding:10,borderRadius:8,fontSize:14}}>{ans}</div>}
  </div>);
}
