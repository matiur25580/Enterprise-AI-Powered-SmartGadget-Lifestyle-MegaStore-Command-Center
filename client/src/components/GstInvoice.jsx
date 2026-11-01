import {useState} from 'react';
export default function GstInvoice({orderId='MS-10234',amount=69999}){
  const [company,setCompany]=useState('');
  const [gstin,setGstin]=useState('');
  const [show,setShow]=useState(false);
  const gst=Math.round(amount*18/118);
  const base=amount-gst;
  const valid=gstin.length===15;
  const inp={width:'100%',padding:10,margin:'6px 0',borderRadius:8,border:'1px solid #353839',background:'#060606',color:'#e6edf3',boxSizing:'border-box'};
  return (<div style={{background:'#212122',border:'1px solid #353839',borderRadius:12,padding:15,marginTop:12,color:'#e6edf3'}}>
    <h4 style={{margin:'0 0 6px'}}>🧾 GST Invoice (Business)</h4>
    <input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company name" style={inp}/>
    <input value={gstin} onChange={e=>setGstin(e.target.value.toUpperCase())} placeholder="GSTIN (15 characters)" maxLength={15} style={inp}/>
    <button onClick={()=>{if(valid){setShow(true);}else{alert('15-char GSTIN dao');}}} style={{padding:'10px 16px',background:'#1f6feb',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Generate Invoice</button>
    {show&&<div style={{marginTop:10,background:'#060606',border:'1px solid #353839',borderRadius:8,padding:12,fontSize:13}}>
      <b>Tax Invoice - {orderId}</b>
      <div>Billed to: {company} ({gstin})</div>
      <div style={{marginTop:6}}>Taxable value: Rs.{base.toLocaleString('en-IN')}</div>
      <div>CGST 9%: Rs.{Math.round(gst/2).toLocaleString('en-IN')} | SGST 9%: Rs.{Math.round(gst/2).toLocaleString('en-IN')}</div>
      <div><b>Total: Rs.{amount.toLocaleString('en-IN')}</b></div>
      <button onClick={()=>window.print()} style={{marginTop:8,padding:'8px 14px',background:'#238636',color:'#fff',border:'none',borderRadius:8}}>Print / Save PDF</button>
    </div>}
  </div>);
}
