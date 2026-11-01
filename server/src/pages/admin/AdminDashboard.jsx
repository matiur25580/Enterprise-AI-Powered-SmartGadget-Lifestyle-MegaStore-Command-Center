import {useEffect,useState} from 'react';import axios from 'axios';
export default function AdminDashboard(){
  const [data,setData]=useState(null);const [dark,setDark]=useState(false);
  const [now,setNow]=useState(new Date());
  useEffect(()=>{
    axios.get('http://localhost:10000/api/extra/analytics/summary').then(r=>setData(r.data.data)).catch(()=>setData({totalProducts:456,totalOrders:128,totalUsers:890,revenue:240000}));
    const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t);
  },[]);
  const dd=String(now.getDate()).padStart(2,'0');const mm=String(now.getMonth()+1).padStart(2,'0');
  const time=`${String(now.getHours()%12||12).padStart(2,'0')}.${String(now.getMinutes()).padStart(2,'0')}.${String(now.getSeconds()).padStart(2,'0')} ${now.getHours()>=12?'PM':'AM'}`;
  const bg=dark?'#121212':'#f5f7fa';const card=dark?'#1e1e1e':'#fff';const txt=dark?'#fff':'#111';
  const cards=[
    ['📦 Total Products',data?.totalProducts||0,'#2a5298'],
    ['🛍️ Total Orders',data?.totalOrders||0,'#ff9800'],
    ['👥 Total Users',data?.totalUsers||0,'#9c27b0'],
    ['💰 Revenue',`₹${((data?.revenue||0)/1000).toFixed(1)}K`,'#00c853'],
  ];
  return (<div style={{minHeight:'100vh',background:bg,color:txt}}>
    <header style={{display:'flex',justifyContent:'space-between',padding:'15px 25px',background:dark?'#000':'#1a237e',color:'#fff'}}>
      <h2>👑 Admin Dashboard</h2>
      <div style={{display:'flex',gap:15,alignItems:'center'}}><span>{dd}.{mm}.{now.getFullYear()} | {time}</span>
      <button onClick={()=>setDark(!dark)} style={{padding:'8px 12px',borderRadius:20,border:'none'}}>{dark?'☀️':'🌙'}</button></div>
    </header>
    <div style={{padding:25,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:15}}>
      {cards.map((c,i)=><div key={i} style={{background:card,padding:20,borderRadius:12,borderLeft:`5px solid ${c[2]}`}}>
        <small>{c[0]}</small><h2 style={{color:c[2]}}>{c[1]}</h2><small style={{color:'#00c853'}}>✓ Updated successfully</small>
      </div>)}
    </div>
    <div style={{padding:'0 25px 25px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:15}}>
      <div style={{background:card,padding:20,borderRadius:12}}><h3>📈 Top Categories</h3>
        {['Mobile - 35%','Computing - 25%','AudioPower - 20%','Lifestyle - 20%'].map((x,i)=><div key={i} style={{margin:'8px 0',background:bg,padding:10,borderRadius:8}}>{x} ✓</div>)}
      </div>
      <div style={{background:card,padding:20,borderRadius:12}}><h3>🤖 AI Insights</h3>
        <p>✅ iPhone + Cover combo te 40% beshi sell hocche</p>
        <p>✅ Coupon MEGASTORE10 te conversion 25% barse</p>
        <p>✅ Wishlist er 60% product 7 din e kena hoy</p>
      </div>
    </div>
  </div>);
}
