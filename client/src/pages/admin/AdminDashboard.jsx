import {useState,useEffect} from 'react';
export default function AdminDashboard(){
  const [now,setNow]=useState(new Date());const [dark,setDark]=useState(false);
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t)},[]);
  const bg=dark?'#121212':'#f5f7fa';const card=dark?'#1e1e1e':'#fff';const txt=dark?'#fff':'#111';
  return (<div style={{minHeight:'100vh',background:bg,color:txt,padding:20}}>
    <h2>👑 Admin Dashboard</h2>
    <p>{String(now.getDate()).padStart(2,'0')}.{String(now.getMonth()+1).padStart(2,'0')}.{now.getFullYear()} | {now.toLocaleTimeString()} <button onClick={()=>setDark(!dark)}>{dark?'☀️':'🌙'}</button></p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12}}>
      {[['📦 Products',456],['🛍️ Orders',128],['👥 Users',890],['💰 Revenue','₹2.4L']].map((c,i)=><div key={i} style={{background:card,padding:20,borderRadius:10}}><small>{c[0]}</small><h2>{c[1]}</h2><small style={{color:'green'}}>✓ Updated successfully</small></div>)}
    </div>
  </div>);
}
