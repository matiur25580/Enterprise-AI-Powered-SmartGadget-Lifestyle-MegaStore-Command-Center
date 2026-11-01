export default function Loyalty(){
  return (<div style={{background:'linear-gradient(135deg,#ffd54f,#ff8f00)',padding:15,borderRadius:10,marginBottom:15,color:'#000'}}>
    <h3>🏆 MegaStore Rewards</h3>
    <div style={{display:'flex',gap:15,flexWrap:'wrap'}}>
      <div style={{background:'rgba(255,255,255,.7)',padding:10,borderRadius:8}}>💰 Your Points: <b>2,450</b> = ₹245 off ✓</div>
      <div style={{background:'rgba(255,255,255,.7)',padding:10,borderRadius:8}}>🎁 Refer & Earn: <b>REF-RUBEL-2026</b> <button onClick={()=>alert('Referral link copied successfully ✓')} style={{marginLeft:8,padding:'4px 10px',borderRadius:5,border:'none',background:'#000',color:'#fff'}}>Copy</button></div>
      <div style={{background:'rgba(255,255,255,.7)',padding:10,borderRadius:8}}>⭐ Rating: <b>4.8/5</b> (12k reviews)</div>
    </div>
  </div>);
}
