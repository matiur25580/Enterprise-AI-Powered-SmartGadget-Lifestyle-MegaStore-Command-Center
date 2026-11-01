import {useState,useEffect} from 'react';
export default function FlashDeal({hours=6,price=0,dealPrice=null}){
  const [sec,setSec]=useState(hours*3600);
  useEffect(()=>{const t=setInterval(()=>setSec(s=>s>0?s-1:0),1000);return()=>clearInterval(t);},[]);
  const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;
  const pad=(n)=>String(n).padStart(2,'0');
  return (<div style={{background:'linear-gradient(90deg,#2B1B17,#3B3131)',border:'1px solid #353839',borderRadius:10,padding:10,marginTop:10,color:'#e6edf3',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
    <div><b>⚡ Flash Deal</b>{dealPrice!==null&&dealPrice!==undefined&&<span> <s style={{color:'#8b949e'}}>Rs.{price.toLocaleString('en-IN')}</s> <b style={{color:'#3fb950'}}>Rs.{dealPrice.toLocaleString('en-IN')}</b></span>}</div>
    <div style={{fontWeight:'bold',color:'#e6edf3'}}>Ends in {pad(h)}:{pad(m)}:{pad(s)}</div>
  </div>);
}
