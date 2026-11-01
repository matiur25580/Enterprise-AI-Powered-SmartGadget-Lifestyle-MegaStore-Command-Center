import {Link} from 'react-router-dom';import {useState} from 'react';
export default function Settings(){
  const [dark,setDark]=useState(false);const [notif,setNotif]=useState(true);const [lang,setLang]=useState('English');
  const save=()=>alert('✓ Settings saved successfully');
  return (<div style={{padding:20,maxWidth:600,margin:'0 auto',fontFamily:'sans-serif',background:dark?'#121212':'#fff',color:dark?'#fff':'#000',minHeight:'80vh',borderRadius:12}}>
    <Link to="/shop">← Shop</Link><h2>⚙️ Settings</h2>
    <div style={{background:dark?'#1e1e1e':'#f5f5f5',padding:15,borderRadius:10,margin:'10px 0'}}>
      <div style={{display:'flex',justifyContent:'space-between',margin:'10px 0'}}><span>🌙 Dark Theme</span><button onClick={()=>setDark(!dark)} style={{padding:'6px 14px',borderRadius:15,border:'none',background:dark?'#00c853':'#ccc'}}>{dark?'ON ✓':'OFF'}</button></div>
      <div style={{display:'flex',justifyContent:'space-between',margin:'10px 0'}}><span>🔔 Notifications</span><button onClick={()=>setNotif(!notif)} style={{padding:'6px 14px',borderRadius:15,border:'none',background:notif?'#00c853':'#ccc'}}>{notif?'ON ✓':'OFF'}</button></div>
      <div style={{margin:'10px 0'}}><span>🌐 Language: </span><select value={lang} onChange={e=>setLang(e.target.value)} style={{padding:6,borderRadius:6}}><option>English</option><option>Bangla</option><option>Hindi</option></select></div>
    </div>
    <button onClick={save} style={{width:'100%',padding:12,background:'#2a5298',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Save Settings ✓</button>
    <div style={{marginTop:15}}><Link to="/terms">📜 Terms & Conditions</Link></div>
  </div>);
}
