import {notifyInfo} from '../utils/notifications.jsx';
export default function Invoice({order}){
  const print=()=>{notifyInfo('Your invoice is ready to print.');window.print()};
  return (<div style={{background:'#fff',padding:15,borderRadius:10,marginTop:15,border:'1px dashed #ccc'}}>
    <h3>🧾 GST Invoice</h3>
    <div style={{fontSize:13}}>Order ID: MS-2026-{Math.floor(Math.random()*99999)}<br/>GSTIN: 19ABCDE1234F1Z5<br/>Items: {order?.length||2} | Total: ₹{(order?.reduce((s,p)=>s+(p.price||999),0)||1998).toLocaleString('en-IN')}</div>
    <button onClick={print} style={{marginTop:8,padding:'8px 14px',background:'#1a237e',color:'#fff',border:'none',borderRadius:6}}>Download Invoice ✓</button>
  </div>);
}
