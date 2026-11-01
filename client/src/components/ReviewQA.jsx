import {useState} from 'react';
export default function ReviewQA(){
  const [reviews,setReviews]=useState([{n:'Rahul',r:5,t:'Best phone! Combo te onek save',h:12},{n:'Priya',r:4,t:'Delivery fast, quality valo',h:8}]);
  const [qs,setQs]=useState([{q:'5G ache?',a:'Ha, full 5G support ✓ Verified Seller'}]);
  const [nr,setNr]=useState('');
  return (<div style={{background:'#fff',padding:15,borderRadius:10,marginTop:15}}>
    <h3>⭐ Reviews ({reviews.length}) + Q&A</h3>
    {reviews.map((x,i)=><div key={i} style={{borderBottom:'1px solid #eee',padding:'8px 0',fontSize:14}}><b>{x.n}</b> {'⭐'.repeat(x.r)}<br/>{x.t}<br/><small>📷 Photo ✓ | 👍 Helpful ({x.h}) <button onClick={()=>{const n=[...reviews];n[i].h++;setReviews(n)}} style={{border:'none',background:'#e3f2fd',borderRadius:4}}>Helpful</button></small></div>)}
    <div style={{display:'flex',gap:6,marginTop:8}}><input value={nr} onChange={e=>setNr(e.target.value)} placeholder="Review likho..." style={{flex:1,padding:8,borderRadius:6,border:'1px solid #ccc'}}/><button onClick={()=>{if(nr){setReviews([...reviews,{n:'You',r:5,t:nr,h:0}]);setNr('');alert('✓ Review added successfully')}}} style={{padding:'8px 12px',background:'#2a5298',color:'#fff',border:'none',borderRadius:6}}>Post ✓</button></div>
    <h4 style={{marginTop:12}}>❓ Q&A</h4>
    {qs.map((x,i)=><div key={i} style={{fontSize:13,background:'#f5f5f5',padding:8,borderRadius:6,margin:'6px 0'}}><b>Q: {x.q}</b><br/>A: {x.a}</div>)}
    <button onClick={()=>{const q=prompt('Question likho:');if(q) setQs([...qs,{q,a:'Seller 24h e reply dibe ✓'}])}} style={{padding:'6px 12px',background:'#ff9800',color:'#fff',border:'none',borderRadius:6}}>Ask Question</button>
  </div>);
}
