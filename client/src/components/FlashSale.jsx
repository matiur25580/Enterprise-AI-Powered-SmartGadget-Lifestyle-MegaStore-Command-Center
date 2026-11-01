import {useState,useEffect} from 'react';
export default function FlashSale(){
  const [sec,setSec]=useState(5*3600+23*60+45);
  useEffect(()=>{const t=setInterval(()=>setSec(s=>s>0?s-1:0),1000);return()=>clearInterval(t)},[]);
  const h=String(Math.floor(sec/3600)).padStart(2,'0');const m=String(Math.floor(sec%3600/60)).padStart(2,'0');const s=String(sec%60).padStart(2,'0');
  return (<div style={{background:'linear-gradient(90deg,#ff416c,#ff4b2b)',color:'#fff',padding:'12px 20px',borderRadius:10,marginBottom:15,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <div><b>⚡ Flash Sale Live!</b> <span style={{opacity:.9}}>iPhone 15 -10% | Earbuds -40% | Laptop -15%</span></div>
    <div style={{background:'rgba(0,0,0,.3)',padding:'6px 12px',borderRadius:8,fontWeight:'bold'}}>Ends in {h}:{m}:{s}</div>
  </div>);
}
