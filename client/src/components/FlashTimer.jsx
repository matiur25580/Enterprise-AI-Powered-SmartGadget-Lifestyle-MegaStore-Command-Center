import {useState,useEffect} from 'react';
export default function FlashTimer(){
  const [s,setS]=useState(7200);
  useEffect(()=>{const t=setInterval(()=>setS(x=>x>0?x-1:0),1000);return()=>clearInterval(t)},[]);
  const h=Math.floor(s/3600),m=Math.floor(s%3600/60),ss=s%60;
  return (<div style={{background:'#ff1744',color:'#fff',padding:'6px 12px',borderRadius:20,fontSize:13,fontWeight:'bold',display:'inline-block'}}>Flash Deal ends in {h}:{String(m).padStart(2,'0')}:{String(ss).padStart(2,'0')}</div>);
}
