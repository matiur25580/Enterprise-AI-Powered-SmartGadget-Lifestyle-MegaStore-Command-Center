import {useState} from 'react';
export default function SupportChat(){
  const [open,setOpen]=useState(false);const [msgs,setMsgs]=useState([{from:'bot',text:'Namaskar! Ami MegaStore AI Support. Kivabe help korte pari?'}]);
  const [inp,setInp]=useState('');
  const send=()=>{
    if(!inp) return;
    setMsgs([...msgs,{from:'user',text:inp},{from:'bot',text:'Dhonnobad! Tomar query note korlam. Support agent 2 min e reply dibe ✓'}]);
    setInp('');
  };
  return (<div style={{position:'fixed',bottom:20,left:20,zIndex:1000}}>
    {!open ? <button onClick={()=>setOpen(true)} style={{width:55,height:55,borderRadius:'50%',background:'#2a5298',color:'#fff',border:'none',fontSize:22}}>💬</button> :
    <div style={{width:300,height:380,background:'#fff',borderRadius:12,boxShadow:'0 4px 20px rgba(0,0,0,.2)',display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <div style={{background:'#2a5298',color:'#fff',padding:12,display:'flex',justifyContent:'space-between'}}><b>💬 Live Support</b><button onClick={()=>setOpen(false)} style={{background:'none',border:'none',color:'#fff'}}>✕</button></div>
      <div style={{flex:1,padding:10,overflowY:'auto',background:'#f5f5f5'}}>
        {msgs.map((m,i)=><div key={i} style={{margin:'6px 0',textAlign:m.from==='user'?'right':'left'}}><span style={{background:m.from==='user'?'#2a5298':'#fff',color:m.from==='user'?'#fff':'#000',padding:'6px 10px',borderRadius:10,display:'inline-block',fontSize:13}}>{m.text}</span></div>)}
      </div>
      <div style={{display:'flex',padding:8}}><input value={inp} onChange={e=>setInp(e.target.value)} placeholder="Likho..." style={{flex:1,padding:8,borderRadius:6,border:'1px solid #ccc'}}/><button onClick={send} style={{marginLeft:6,padding:'8px 12px',background:'#00c853',color:'#fff',border:'none',borderRadius:6}}>Send</button></div>
    </div>}
  </div>);
}
