import {useState} from 'react';
export default function HaggleBot({price=66999,name='iPhone 15'}){
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState([{from:'bot',text:'Namaskar! Ami MegaStore AI. '+name+' er dam Rs.'+price.toLocaleString('en-IN')+'. Tomar offer bolo, damadami kori!'}]);
  const [inp,setInp]=useState('');
  const send=()=>{
    const offer=parseInt(inp.replace(/[^0-9]/g,''),10);
    if(isNaN(offer)||offer<=0){return;}
    const min=Math.round(price*0.82);
    let reply='';
    if(offer>=price*0.95){reply='Deal! Rs.'+offer.toLocaleString('en-IN')+' e tomar. Ekhon cart e add koro.';}
    else if(offer>=price*0.88){const c=Math.round((offer+price)/2);reply='Hmm... Rs.'+c.toLocaleString('en-IN')+' hole dite pari. Raji?';}
    else if(offer>=min){reply='Etto kom e hobe na. Rs.'+Math.round(price*0.9).toLocaleString('en-IN')+' last price.';}
    else{reply='Sorry, Rs.'+min.toLocaleString('en-IN')+' er niche somvob na.';}
    setMsgs(msgs.concat([{from:'user',text:'Rs.'+offer.toLocaleString('en-IN')},{from:'bot',text:reply}]));
    setInp('');
  };
  if(open===false){
    return (<button onClick={()=>setOpen(true)} style={{marginTop:10,padding:'10px 16px',background:'#1f6feb',color:'#fff',border:'none',borderRadius:10,fontWeight:'bold'}}>🤖 Damadami Koro (AI)</button>);
  }
  return (<div style={{background:'#212122',border:'1px solid #353839',borderRadius:12,padding:12,marginTop:10,color:'#e6edf3',maxWidth:380}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <b>🤖 AI Bargaining</b>
      <button onClick={()=>setOpen(false)} style={{background:'none',border:'none',color:'#8b949e',fontSize:16,cursor:'pointer'}}>X</button>
    </div>
    <div style={{maxHeight:220,overflowY:'auto',margin:'8px 0'}}>
      {msgs.map((m,i)=><div key={i} style={{textAlign:m.from==='bot'?'left':'right',margin:'6px 0'}}><span style={{display:'inline-block',background:m.from==='bot'?'#353839':'#1f6feb',color:'#fff',padding:'7px 11px',borderRadius:12,fontSize:13}}>{m.text}</span></div>)}
    </div>
    <div style={{display:'flex',gap:6}}>
      <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){send();}}} placeholder="Tomar offer (Rs.)" style={{flex:1,padding:9,borderRadius:8,border:'1px solid #353839',background:'#060606',color:'#e6edf3'}}/>
      <button onClick={send} style={{padding:'9px 14px',background:'#238636',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Send</button>
    </div>
  </div>);
}
