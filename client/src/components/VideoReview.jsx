export default function VideoReview(){
  return (<div style={{background:'#fff',padding:12,borderRadius:10,marginTop:10}}>
    <h4>🎥 Video Reviews (12)</h4>
    <div style={{display:'flex',gap:8,overflowX:'auto'}}>
      {[1,2,3].map(i=><div key={i} style={{minWidth:120,height:90,background:'#000',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:28}}>▶<small style={{position:'absolute',marginTop:50,fontSize:10}}>0:{i}5</small></div>)}
    </div>
    <button onClick={()=>alert('Video upload started')} style={{marginTop:8,padding:'6px 12px',background:'#2a5298',color:'#fff',border:'none',borderRadius:6}}>Upload Video Review</button>
  </div>);
}
