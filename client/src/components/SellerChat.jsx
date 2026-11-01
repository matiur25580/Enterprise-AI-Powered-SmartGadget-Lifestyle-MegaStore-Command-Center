import {useState} from 'react';
const THREADS=[
  {id:1,customer:'Rahul',msgs:[{from:'c',text:'Dada, iPhone 15 e extra discount hobe?'},{from:'s',text:'MEGA10 coupon use koro, 10% off pabe!'}]},
  {id:2,customer:'Priya',msgs:[{from:'c',text:'Delivery kobe asbe?'}]}
];
export default function SellerChat(){
  const [active,setActive]=useState(0);
  const [threads,setThreads]=useState(THREADS);
  const [inp,setInp]=useState('');
  const send=()=>{
    if(inp.trim()===''){return;}
    const t=threads.slice();
    t[active]=Object.assign({},t[active],{msgs:t[active].msgs.concat([{from:'s',text:inp}])});
    setThreads(t);setInp('');
  };
  const cur=threads[active];
  return (<div style={{background:'#212122',border:'1px solid #353839',borderRadius:12,padding:15,marginTop:12,color:'#e6edf3'}}>
    <h4 style={{margin:'0 0 8px'}}>💬 Seller Live Chat</h4>
    <div style={{display:'flex',gap:8}}>
      <div style={{width:100}}>
        {threads.map((t,i)=><div key={t.id} onClick={()=>setActive(i)} style={{padding:8,borderRadius:8,cursor:'pointer',background:i===active?'#1f6feb':'#060606',marginBottom:6,fontSize:13}}>{t.customer}</div>)}
      </div>
      <div style={{flex:1,background:'#060606',borderRadius:8,padding:10,minHeight:150,border:'1px solid #353839'}}>
        {cur.msgs.map((m,i)=><div key={i} style={{textAlign:m.from==='s'?'right':'left',margin:'6px 0'}}><span style={{display:'inline-block',background:m.from==='s'?'#1f6feb':'#353839',color:'#fff',padding:'6px 10px',borderRadius:12,fontSize:13}}>{m.text}</span></div>)}
        <div style={{display:'flex',gap:6,marginTop:8}}>
          <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){send();}}} placeholder="Reply..." style={{flex:1,padding:8,borderRadius:8,border:'1px solid #353839',background:'#212122',color:'#e6edf3'}}/>
          <button onClick={send} style={{padding:'8px 12px',background:'#238636',color:'#fff',border:'none',borderRadius:8}}>Send</button>
        </div>
      </div>
    </div>
  </div>);
}
