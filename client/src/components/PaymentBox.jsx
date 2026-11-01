import {useState} from 'react';
// EMI eligible: sudhu expensive - iPhone, Android, Laptop, Desktop, Tablet
const EMI_ELIGIBLE=['iPhone','Android Phone','Laptop','Desktop','Tablet','Galaxy Tab'];
export default function PaymentBox({total=5000,productName='iPhone 15'}){
  const [m,setM]=useState('COD');const [done,setDone]=useState(false);const [months,setMonths]=useState(12);
  const isEMIEligible=EMI_ELIGIBLE.some(k=>productName.toLowerCase().includes(k.toLowerCase()))||total>=15000;
  // Real life: EMI te price ektu besi - 8% interest
  const interestRate=0.08;
  const emiTotal=Math.round(total*(1+interestRate));
  const emiPer=Math.round(emiTotal/months);
  const extra=emiTotal-total;
  const methods=isEMIEligible?['UPI','Card','EMI','COD']:['UPI','Card','COD'];
  const payable = m==='EMI' ? emiTotal : total;
  const pay=()=>{setDone(true);alert('✓ Payment successful via '+m+(m==='EMI'?` (${months}mo x ₹${emiPer})`:'')+'! Order confirmed');};
  if(done) return (<div style={{background:'#e8f5e9',padding:20,borderRadius:10,textAlign:'center'}}><div style={{fontSize:40}}>✅</div><h3>Order Placed!</h3><p>{m==='EMI'?`EMI: ₹${emiPer}/mo x ${months}`:`₹${total.toLocaleString('en-IN')} paid via ${m}`}</p><button onClick={()=>alert('✓ Invoice downloaded')} style={{padding:'8px 16px',background:'#1a237e',color:'#fff',border:'none',borderRadius:6}}>Invoice ✓</button></div>);
  return (<div style={{background:'#fff',padding:15,borderRadius:10,border:'1px solid #ddd',fontFamily:'sans-serif'}}>
    <h3>💳 Payment - {productName}</h3>
    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:10}}>
      {methods.map(x=><label key={x} style={{background:m===x?'#e3f2fd':'#f5f5f5',padding:'8px 14px',borderRadius:8,cursor:'pointer',border:m===x?'2px solid #2a5298':'1px solid #ddd'}}><input type="radio" checked={m===x} onChange={()=>setM(x)} style={{marginRight:6}}/>{x==='COD'?'💵 COD':x==='EMI'?'📅 EMI':x==='UPI'?'📱 UPI':'💳 Card'}</label>)}
    </div>
    {!isEMIEligible&&<div style={{fontSize:12,background:'#fff3e0',padding:8,borderRadius:6}}>ℹ️ EMI sudhu ₹15,000+ product e (iPhone, Laptop etc)</div>}
    {m==='EMI'&&isEMIEligible&&<div style={{background:'#fff3e0',padding:12,borderRadius:8,marginTop:8}}>
      <b>📅 EMI Plan (real life er moto 8% interest)</b>
      <div style={{marginTop:6}}><label>Months: </label><select value={months} onChange={e=>setMonths(+e.target.value)} style={{padding:6,borderRadius:6}}><option value={3}>3 months</option><option value={6}>6 months</option><option value={9}>9 months</option><option value={12}>1 year</option><option value={24}>2 years (max)</option></select></div>
      <div style={{marginTop:8,fontSize:14}}>
        Product: ₹{total.toLocaleString('en-IN')}<br/>
        Interest (8%): +₹{extra.toLocaleString('en-IN')}<br/>
        <b>Total payable: ₹{emiTotal.toLocaleString('en-IN')}</b><br/>
        <b style={{color:'#2a5298'}}>Per month: ₹{emiPer.toLocaleString('en-IN')} x {months}</b>
      </div>
    </div>}
    {m==='COD'&&<div style={{background:'#e8f5e9',padding:8,borderRadius:6,fontSize:13,marginTop:8}}>💵 Cash on Delivery - product hate peye taka dio ✓ No advance</div>}
    <div style={{marginTop:10,fontWeight:'bold',fontSize:18}>Payable: Rs.{payable.toLocaleString('en-IN')}</div>
    <button onClick={pay} style={{width:'100%',padding:12,background:'#00c853',color:'#fff',border:'none',borderRadius:8,marginTop:8,fontWeight:'bold',fontSize:16}}>Place Order ✓ {m}</button>
  </div>);
}
