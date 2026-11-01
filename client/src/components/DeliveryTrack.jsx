export default function DeliveryTrack({status='Shipped'}){
  const steps=['Confirmed','Packed','Shipped','Out for Delivery','Delivered'];
  const idx=steps.indexOf(status);const cur=idx>=0?idx:2;
  return (<div style={{padding:15,fontFamily:'sans-serif'}}>
    <h4>🚚 Delivery Status</h4>
    <div style={{display:'flex',alignItems:'center'}}>
      {steps.map((s,i)=><div key={i} style={{display:'flex',alignItems:'center',flex:1}}>
        <div style={{textAlign:'center'}}><div style={{width:32,height:32,borderRadius:'50%',background:i<=cur?'#00c853':'#e0e0e0',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>{i<=cur?'✓':i+1}</div><small style={{fontSize:10}}>{s}</small></div>
        {i<steps.length-1&&<div style={{flex:1,height:3,background:i<cur?'#00c853':'#e0e0e0',margin:'0 4px'}}/>}
      </div>)}
    </div>
    <div style={{marginTop:8,fontSize:13,background:'#e8f5e9',padding:8,borderRadius:6}}>✓ Expected delivery: 3-5 days | Live tracking active</div>
  </div>);
}
