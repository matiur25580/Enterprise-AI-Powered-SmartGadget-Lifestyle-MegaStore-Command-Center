import {useEffect,useState} from 'react';
export default function Dashboard({role}){
  const [dark,setDark]=useState(false);
  const [now,setNow]=useState(new Date());
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t)},[]);
  const dd=String(now.getDate()).padStart(2,'0');const mm=String(now.getMonth()+1).padStart(2,'0');const yyyy=now.getFullYear();
  let h=now.getHours();const ap=h>=12?'PM':'AM';h=h%12||12;
  const time=`${String(h).padStart(2,'0')}.${String(now.getMinutes()).padStart(2,'0')}.${String(now.getSeconds()).padStart(2,'0')} ${ap}`;
  const date=`${dd}.${mm}.${yyyy}`;
  const bg=dark?'#121212':'#f5f7fa';const card=dark?'#1e1e1e':'#fff';const txt=dark?'#fff':'#111';
  return (<div style={{minHeight:'100vh',background:bg,color:txt}}>
    <header style={{display:'flex',justifyContent:'space-between',padding:'15px 25px',background:dark?'#000':'#2a5298',color:'#fff'}}>
      <h2>🛒 {role} Dashboard</h2>
      <div style={{display:'flex',gap:15,alignItems:'center'}}>
        <span>{date} | {time}</span>
        <button onClick={()=>setDark(!dark)} style={{padding:'8px 12px',borderRadius:20,border:'none',cursor:'pointer'}}>{dark?'☀️':'🌙'}</button>
      </div>
    </header>
    <div style={{padding:25,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:15}}>
      {[`Total Orders`,`Products`,`Revenue`,`Customers`].map((t,i)=>(
        <div key={i} style={{background:card,padding:20,borderRadius:12,boxShadow:'0 2px 8px rgba(0,0,0,.1)'}}>
          <h4>{t}</h4><h2 style={{color:'#2a5298'}}>{[128,456,'₹2.4L',890][i]}</h2>
          <small style={{color:'#00c853'}}>✓ Updated successfully</small>
        </div>
      ))}
    </div>
    <div style={{padding:'0 25px'}}>
      <div style={{background:card,padding:20,borderRadius:12}}>
        <h3>AI Perfect Combo Suggestions</h3>
        <p>iPhone 15 + Cover + 20W Adapter + Earbuds = <b style={{color:'#00c853'}}>Perfect Match ✓</b></p>
        <p>Laptop + Laptop Charger + Pendrive 128GB + Mouse = <b style={{color:'#00c853'}}>Perfect Match ✓</b></p>
      </div>
    </div>
  </div>);
}
