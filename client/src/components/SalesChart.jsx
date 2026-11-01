export default function SalesChart(){
  const data=[['Mon',45],['Tue',70],['Wed',55],['Thu',85],['Fri',95],['Sat',120],['Sun',100]];
  const max=120;
  return (<div style={{background:'#fff',padding:15,borderRadius:10,marginTop:15}}>
    <h3>📊 Weekly Sales</h3>
    <div style={{display:'flex',alignItems:'end',gap:8,height:140}}>
      {data.map((d,i)=><div key={i} style={{flex:1,textAlign:'center'}}><div style={{height:(d[1]/max*120),background:'linear-gradient(#667eea,#764ba2)',borderRadius:'6px 6px 0 0'}}></div><small>{d[0]}</small><div style={{fontSize:11,fontWeight:'bold'}}>₹{d[1]}k</div></div>)}
    </div>
    <div style={{marginTop:10,display:'flex',gap:10}}><span style={{background:'#e8f5e9',padding:'6px 10px',borderRadius:6,fontSize:12}}>✓ Top: iPhone 15 (45 sold)</span><span style={{background:'#e3f2fd',padding:'6px 10px',borderRadius:6,fontSize:12}}>📈 +23% vs last week</span></div>
  </div>);
}
