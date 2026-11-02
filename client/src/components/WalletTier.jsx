import {toast} from '../utils/notifications.jsx';
export default function WalletTier(){
  return (<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:15}}>
    <div style={{background:'linear-gradient(135deg,#ffd54f,#ff8f00)',padding:15,borderRadius:10}}>
      <h4>💰 Wallet</h4><div>Balance: <b>₹350</b></div><small>Refer code: <b>RUBEL2026</b></small><br/><button onClick={()=>toast.success('Your referral code is ready to share.')} style={{marginTop:6,padding:'6px 10px',border:'none',borderRadius:6,background:'#000',color:'#fff'}}>Refer & Earn ₹100</button>
    </div>
    <div style={{background:'linear-gradient(135deg,#e1bee7,#9c27b0)',color:'#fff',padding:15,borderRadius:10}}>
      <h4>🏆 Gold Tier</h4><div>2,450 pts → Platinum e 550 baki</div><div style={{background:'rgba(255,255,255,.3)',height:8,borderRadius:4,marginTop:6}}><div style={{width:'82%',height:8,background:'#fff',borderRadius:4}}></div></div><small>✓ Extra 5% off unlocked</small>
    </div>
  </div>);
}
