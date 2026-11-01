import {useState} from 'react';
export default function GiftWrap(){
  const [on,setOn]=useState(false);
  return (<div style={{marginTop:10}}>
    <label><input type="checkbox" checked={on} onChange={()=>setOn(!on)}/> 🎁 Gift wrap (+Rs.49)</label>
    {on&&<input placeholder="Gift message likho..." style={{width:'100%',padding:8,marginTop:6,borderRadius:6,border:'1px solid #ccc'}}/>}
  </div>);
}
