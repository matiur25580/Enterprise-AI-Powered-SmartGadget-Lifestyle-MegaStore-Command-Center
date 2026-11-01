import {useState,useEffect} from 'react';
export default function OfferZone(){
  const [sec,setSec]=useState(5*3600+23*60);
  useEffect(()=>{const t=setInterval(()=>setSec(s=>s>0?s-1:0),1000);return()=>clearInterval(t)},[]);
  const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;
  const [coupon,setCoupon]=useState('');const [applied,setApplied]=useState(null);
  const apply=()=>{const c={MEGA10:10,DIWALI20:20,NEWUSER15:15};if(c[coupon.toUpperCase()]){setApplied({code:coupon.toUpperCase(),off:c[coupon.toUpperCase()]});alert('✓ Coupon applied: '+coupon.toUpperCase()+' - '+c[coupon.toUpperCase()]+'% OFF')}else alert('✕ Invalid coupon')};
  return (<div style={{fontFamily:'sans-serif'}}>
    <div style={{background:'linear-gradient(90deg,#ff416c,#ff4b2b)',color:'#fff',padding:12,textAlign:'center',fontWeight:'bold'}}>
      🔥 MEGA SALE ends in {String(h).padStart(2,'0')}:{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')} | Extra 10% off on 3+ items | Free delivery over ₹499
    </div>
    <div style={{display:'flex',gap:10,padding:12,background:'#fff3e0',alignItems:'center',flexWrap:'wrap',justifyContent:'center'}}>
      <b>🎟️ Have coupon?</b>
      <input value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder="MEGA10 / DIWALI20" style={{padding:8,borderRadius:6,border:'1px solid #ccc'}}/>
      <button onClick={apply} style={{padding:'8px 14px',background:'#2a5298',color:'#fff',border:'none',borderRadius:6}}>Apply ✓</button>
      {applied&&<span style={{background:'#e8f5e9',padding:'6px 12px',borderRadius:12,fontSize:13}}>✓ {applied.code}: {applied.off}% OFF applied</span>}
      <span style={{fontSize:12,opacity:.7}}>💡 Buy 3+ get extra 5% | Buy 5+ get extra 10% auto</span>
    </div>
  </div>);
}
