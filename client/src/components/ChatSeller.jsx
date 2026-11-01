import {useState} from 'react';
export default function ChatSeller(){
  const [open,setOpen]=useState(false);const [m,setM]=useState('');
  return (<div style={{marginTop:10}}>
    {!open?<button onClick={()=>setOpen(true)} style={{padding:'8px 14px',background:'#25d366',color:'#fff',border:'none',borderRadius:8}}>💬 Chat with Seller</button>:
    <div style={{border:'1px solid #ddd',borderRadius:10,padding:10,maxWidth:300}}>
      <b>Seller: TechWorld ✓</b><button onClick={()=>setOpen(false)} style={{float:'right',border:'none',background:'none'}}>X</button>
      <div style={{background:'#f5f5f5',padding:8,borderRadius:6,margin:'8px 0',fontSize:13}}>Namaskar! Product niye kichu jigges korun.</div>
      <div style={{display:'flex',gap:6}}><input value={m} onChange={e=>setM(e.target.value)} placeholder="Likho..." style={{flex:1,padding:6,borderRadius:6,border:'1px solid #ccc'}}/><button onClick={()=>{alert('Message sent to seller');setM('')}} style={{padding:'6px 10px',background:'#25d366',color:'#fff',border:'none',borderRadius:6}}>Send</button></div>
    </div>}
  </div>);
}
