import {useState} from 'react';
export default function PriceAlert(){
  const [on,setOn]=useState(false);
  return (<div style={{background:'#fff3e0',padding:12,borderRadius:8,marginTop:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <div><b>Price Drop Alert</b><br/><small>Dam komle janabo</small></div>
    <button onClick={()=>{setOn(!on);alert(on?'Alert off':'Price alert ON')}} style={{padding:'8px 14px',borderRadius:20,border:'none',background:on?'#00c853':'#ff9800',color:'#fff',fontWeight:'bold'}}>{on?'ON':'OFF'}</button>
  </div>);
}
