export default function DeliveryTrack({status='Shipped'}){
  const steps=['Confirmed','Packed','Shipped','Out for Delivery','Delivered'];
  const idx=steps.indexOf(status);const cur=idx>=0?idx:2;
  return (<div style={{padding:15,fontFamily:'sans-serif',background:'#212122',borderRadius:12,border:'1px solid #353839',color:'#e6edf3'}}>
    <h4 style={{color:'#e6edf3'}}>Delivery Status</h4>
    <div style={{display:'flex',alignItems:'center'}}>
      {steps.map((s,i)=><div key={i} style={{display:'flex',alignItems:'center',flex:1}}>
        <div style={{textAlign:'center'}}><div style={{width:32,height:32,borderRadius:'50%',background:i<=cur?'#238636':'#353839',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,border:i<=cur?'none':'1px solid #353839'}}>{i<=cur?'✓':i+1}</div><small style={{fontSize:10,color:'#8b949e'}}>{s}</small></div>
        {i<steps.length-1&&<div style={{flex:1,height:3,background:i<cur?'#238636':'#353839',margin:'0 4px',borderRadius:2}}/>}
      </div>)}
    </div>
    <div style={{marginTop:8,fontSize:13,background:'#0d2b1f',color:'#3fb950',padding:8,borderRadius:6,border:'1px solid #238636'}}>Expected delivery: 3-5 days | Live tracking active</div>
  </div>);
}
