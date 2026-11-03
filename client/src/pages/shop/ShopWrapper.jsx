import Shop from './Shop.jsx';import Loyalty from '../../components/Loyalty.jsx';
import AISearch from '../../components/AISearch.jsx';import ReviewQA from '../../components/ReviewQA.jsx';import WalletTier from '../../components/WalletTier.jsx';import CategoryGrid from '../../components/CategoryGrid.jsx';
import VisualSearch from '../../components/VisualSearch.jsx';import VoiceSearch from '../../components/VoiceSearch.jsx';
export default function ShopWrapper(){
  return (<div style={{maxWidth:1100,margin:'0 auto'}}>
    <AISearch/>
    <WalletTier/>
    <CategoryGrid/>
    <Loyalty/>
    <VisualSearch/><VoiceSearch/><Shop/>
    <div style={{padding:'0 20px',display:'grid',gridTemplateColumns:'minmax(0,1fr)',gap:12}}>
      <ReviewQA/>
    </div>
    <p style={{margin:'0 20px 20px',padding:12,borderRadius:8,background:'#e3f2fd',color:'#1e3a8a'}}>Checkout currently supports Cash on Delivery. Online card and UPI payments are not enabled.</p>
    <div style={{padding:20,display:'flex',gap:8,flexWrap:'wrap'}}>
      <span style={{background:'#e8f5e9',padding:'6px 12px',borderRadius:12,fontSize:12}}>✓ Verified Seller</span>
      <span style={{background:'#e3f2fd',padding:'6px 12px',borderRadius:12,fontSize:12}}>🔒 Fraud Protected</span>
      <span style={{background:'#fff3e0',padding:'6px 12px',borderRadius:12,fontSize:12}}>🌐 বাংলা | हिंदी | English</span>
      <span style={{background:'#f3e5f5',padding:'6px 12px',borderRadius:12,fontSize:12}}>📱 PWA Ready</span>
    </div>
  </div>);
}
