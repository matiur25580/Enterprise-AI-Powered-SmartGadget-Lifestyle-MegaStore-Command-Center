import {useState} from 'react';
import {toast} from '../utils/notifications.jsx';
export default function SpinWheel(){
  const [win,setWin]=useState('');
  const spin=()=>{const p=['10% OFF','Rs.100','20% OFF','Free Delivery'];const w=p[Math.floor(Math.random()*p.length)];setWin(w);toast.success(`You won ${w}!`);};
  return (<div style={{background:'linear-gradient(135deg,#ffd54f,#ff8f00)',padding:12,borderRadius:10,marginTop:10,textAlign:'center'}}>
    <b>🎡 Spin & Win</b><br/><button onClick={spin} style={{marginTop:6,padding:'8px 16px',background:'#000',color:'#fff',border:'none',borderRadius:20}}>SPIN</button>
    {win&&<div style={{marginTop:6,fontWeight:'bold'}}>You won: {win}</div>}
  </div>);
}
