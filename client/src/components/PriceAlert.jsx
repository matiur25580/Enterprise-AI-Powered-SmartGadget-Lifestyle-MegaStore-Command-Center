import {useState} from 'react';
import {toast} from '../utils/notifications.jsx';
export default function PriceAlert(){
  const [on,setOn]=useState(false);
  return (<div style={{background:'#fff3e0',padding:12,borderRadius:8,marginTop:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <div><b>Price Drop Alert</b><br/><small>Dam komle janabo</small></div>
    <button onClick={()=>{setOn(!on);toast.success(on?'Price alerts turned off.':'Price alerts turned on.')}} style={{padding:'8px 14px',borderRadius:20,border:'none',background:on?'#00c853':'#ff9800',color:'#fff',fontWeight:'bold'}}>{on?'ON':'OFF'}</button>
  </div>);
}
