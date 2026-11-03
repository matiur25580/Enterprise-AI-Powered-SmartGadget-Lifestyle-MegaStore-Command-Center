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

export default function AdminDashboard(){
  const [now,setNow]=useState(new Date());
  const [dark,setDark]=useState(false);
  const [stats,setStats]=useState(null);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(true);
  const auth=readAuth();
  const background=dark?'#121826':'#f3f6fa';
  const surface=dark?'#1e293b':'#fff';
  const text=dark?'#e5e7eb':'#172033';

  useEffect(()=>{
    const timer=setInterval(()=>setNow(new Date()),1000);
    return ()=>clearInterval(timer);
  },[]);

  useEffect(()=>{
    let active=true;
    axios.get(`${API}/api/extra/analytics/summary`,{
      headers:{Authorization:`Bearer ${auth?.token||''}`},
    }).then(response=>{
      if(active)setStats(response.data.data);
    }).catch(()=>{
      if(active)setError('Live analytics could not be loaded. Please try again later.');
    }).finally(()=>{
      if(active)setLoading(false);
    });
    return ()=>{active=false;};
  },[]);

  const date=`${String(now.getDate()).padStart(2,'0')}.${String(now.getMonth()+1).padStart(2,'0')}.${now.getFullYear()}`;
  const time=now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  const metrics=[
    ['Products',stats?.totalProducts],
    ['Orders',stats?.totalOrders],
    ['Registered users',stats?.totalUsers],
    ['Revenue',stats?`₹${Number(stats.revenue||0).toLocaleString('en-IN')}`:null],
  ];

  return (
    <main style={{minHeight:'100vh',background,color:text,padding:'clamp(16px,3vw,32px)',fontFamily:'sans-serif'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap',marginBottom:24}}>
        <div>
          <Link to="/" style={{color:dark?'#93c5fd':'#1d4ed8'}}>← Home</Link>
          <h1 style={{margin:'10px 0 4px'}}>Administration</h1>
          <strong style={{color:dark?'#fcd34d':'#a16207'}}>ADMINISTRATOR</strong>
          <div style={{fontSize:13,opacity:.75,marginTop:6}}>{date} | {time}</div>
        </div>
        <button type="button" onClick={()=>setDark(value=>!value)} aria-label="Toggle dashboard theme" style={{padding:'10px 14px',borderRadius:8,border:'1px solid #94a3b8',background:surface,color:text,cursor:'pointer'}}>{dark?'☀️ Light':'🌙 Dark'}</button>
      </header>

      <section aria-labelledby="admin-overview-title">
        <h2 id="admin-overview-title">Store overview</h2>
        {loading&&<p role="status">Loading live analytics…</p>}
        {error&&<p role="alert" style={{color:'#dc2626'}}>{error}</p>}
        {!loading&&!error&&stats&&(
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:14}}>
            {metrics.map(([label,value])=>(
              <article key={label} style={{background:surface,border:'1px solid #94a3b833',borderRadius:14,padding:20}}>
                <div style={{fontSize:13,opacity:.75}}>{label}</div>
                <strong style={{display:'block',fontSize:30,marginTop:8}}>{value}</strong>
                <small style={{opacity:.7}}>Current database totals</small>
              </article>
            ))}
          </div>
        )}
      </section>
      <p style={{marginTop:20,fontSize:13,opacity:.7}}>Revenue excludes cancelled orders. Metrics are computed from persisted catalog, order, and user records.</p>
    </main>
  );
}
