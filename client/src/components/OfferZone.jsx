import {useState,useEffect} from 'react';
import {calculateCouponDiscount} from '../utils/commerce.js';
import {useStore} from '../context/StoreContext.jsx';
export default function OfferZone(){
  const [sec,setSec]=useState(5*3600+23*60);
  useEffect(()=>{const t=setInterval(()=>setSec(s=>s>0?s-1:0),1000);return()=>clearInterval(t)},[]);
  const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;
  const [coupon,setCoupon]=useState('');const [applied,setApplied]=useState(null);
  const {cart}=useStore();
  const apply=()=>{const c={MEGA10:10,DIWALI20:20,NEWUSER15:15};if(c[coupon.toUpperCase()]){setApplied({code:coupon.toUpperCase(),off:c[coupon.toUpperCase()]});alert('Coupon applied: '+coupon.toUpperCase()+' - '+c[coupon.toUpperCase()]+'% OFF')}else alert('Invalid coupon')};
  return (<div style={{fontFamily:'sans-serif'}}>
    <div style={{background:'linear-gradient(90deg,#2B1B17,#3B3131)',color:'#e6edf3',padding:12,textAlign:'center',fontWeight:'bold',borderBottom:'1px solid #353839'}}>
      MEGA SALE ends in {String(h).padStart(2,'0')}:{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')} | Extra 10% off on 3+ items | Free delivery over Rs.499
    </div>
    <div style={{display:'flex',gap:10,padding:12,background:'#212122',color:'#e6edf3',alignItems:'center',flexWrap:'wrap',justifyContent:'center',borderBottom:'1px solid #353839'}}>
      <b>Have coupon?</b>
      <input value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder="MEGA10 / DIWALI20" style={{padding:8,borderRadius:8,border:'1px solid #353839',background:'#060606',color:'#e6edf3'}}/>
      <button onClick={apply} style={{padding:'8px 14px',background:'#1f6feb',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Apply</button>
      {applied&&<span style={{background:'#0d2b1f',color:'#3fb950',padding:'6px 12px',borderRadius:12,fontSize:13,border:'1px solid #238636'}}>{applied.code}: {applied.off}% OFF applied · Save ₹{calculateCouponDiscount(cart.reduce((sum,item)=>sum+(Number(item.price)||0),0),applied.off).toLocaleString('en-IN')}</span>}
      <span style={{fontSize:12,opacity:.7}}>Buy 3+ get extra 5% | Buy 5+ get extra 10% auto</span>
    </div>
  </div>);
}
