import {useState} from 'react';
export default function Referral(){
  const code='RUBEL100';
  const [invites,setInvites]=useState(3);
  const [earned,setEarned]=useState(250);
  const copy=()=>{
    const link='https://megastore.vercel.app/register?ref='+code;
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(link).then(()=>alert('Referral link copied!')).catch(()=>alert('Code: '+code));}
    else{alert('Code: '+code);}
  };
  const invite=()=>{setInvites(invites+1);setEarned(earned+100);alert('Invite pathano hoyeche! Friend kinle Rs.100 bonus.');};
  return (<div style={{background:'#212122',border:'1px solid #353839',borderRadius:12,padding:15,marginTop:12,color:'#e6edf3'}}>
    <h4 style={{margin:'0 0 6px'}}>🎁 Refer & Earn</h4>
    <p style={{fontSize:13,color:'#8b949e',margin:'0 0 8px'}}>Friend ke invite koro, prottek purchase e <b style={{color:'#3fb950'}}>Rs.100</b> bonus!</p>
    <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
      <span style={{background:'#060606',border:'1px dashed #58a6ff',color:'#58a6ff',padding:'8px 14px',borderRadius:8,fontWeight:'bold',letterSpacing:2}}>{code}</span>
      <button onClick={copy} style={{padding:'9px 14px',background:'#1f6feb',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Copy Link</button>
      <button onClick={invite} style={{padding:'9px 14px',background:'#238636',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Invite Friend</button>
    </div>
    <div style={{fontSize:13,marginTop:8}}>Invites: <b>{invites}</b> | Earned: <b style={{color:'#3fb950'}}>Rs.{earned}</b></div>
  </div>);
}
