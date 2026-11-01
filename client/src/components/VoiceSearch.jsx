import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
export default function VoiceSearch(){
  const nav=useNavigate();
  const [q,setQ]=useState('');
  const [listening,setListening]=useState(false);
  const fix=(s)=>{
    const m={iphon:'iphone',samsang:'samsung',laptap:'laptop',airpod:'earbuds',hedphon:'headphone'};
    let x=s.toLowerCase();
    Object.keys(m).forEach(k=>{x=x.split(k).join(m[k]);});
    return x;
  };
  const go=(t)=>{
    const cleaned=fix(t);
    if(cleaned.trim()===''){return;}
    nav('/shop?search='+encodeURIComponent(cleaned));
  };
  const mic=()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(SR===undefined||SR===null){alert('Voice search ei browser e supported na, type koro');return;}
    const rec=new SR();
    rec.lang='en-IN';
    rec.onresult=(e)=>{const t=e.results[0][0].transcript;setQ(t);setListening(false);go(t);};
    rec.onerror=()=>setListening(false);
    rec.onend=()=>setListening(false);
    try{rec.start();setListening(true);}catch(e){setListening(false);}
  };
  return (<div style={{display:'flex',gap:6,marginTop:10}}>
    <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){go(q);}}} placeholder="Search products... (mic o ache, typo ok)" style={{flex:1,padding:10,borderRadius:8,border:'1px solid #353839',background:'#060606',color:'#e6edf3'}}/>
    <button onClick={()=>go(q)} style={{padding:'10px 14px',borderRadius:8,background:'#1f6feb',color:'#fff',border:'none',fontWeight:'bold'}}>Search</button>
    <button onClick={mic} title="Voice search" style={{padding:'10px 14px',borderRadius:8,background:listening?'#da3633':'#238636',color:'#fff',border:'none',fontWeight:'bold'}}>{listening?'...':'Mic'}</button>
  </div>);
}
