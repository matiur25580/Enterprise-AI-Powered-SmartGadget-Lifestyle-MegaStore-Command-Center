import {useState} from 'react';
export default function EmiCheck(){
  const [done,setDone]=useState(false);
  return (<div style={{background:'#e3f2fd',padding:12,borderRadius:8,marginTop:10}}>
    <b>📅 EMI Pre-approval</b>
    {!done?<button onClick={()=>{setDone(true);alert('EMI approved up to Rs.100000')}} style={{marginLeft:10,padding:'6px 12px',background:'#2a5298',color:'#fff',border:'none',borderRadius:6}}>Check in 2 min</button>:
    <div style={{marginTop:6,fontSize:13,color:'green'}}>Approved up to Rs.1,00,000 | Zero down payment</div>}
  </div>);
}
