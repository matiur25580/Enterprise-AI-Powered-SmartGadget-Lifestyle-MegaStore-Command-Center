import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Login from './pages/auth/Login.jsx';import Register from './pages/auth/Register.jsx';
import Shop from './pages/shop/Shop.jsx';import Checkout from './pages/shop/Checkout.jsx';
import SellerDashboard from './pages/seller/SellerDashboard.jsx';import AdminDashboard from './pages/admin/AdminDashboard.jsx';
function Landing(){
  return (<div style={{minHeight:'100vh',background:'linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f093fb 100%)',color:'#fff',padding:40,textAlign:'center',fontFamily:'sans-serif'}}>
    <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h2>🛒 MegaStore</h2>
      <div><Link to="/shop" style={{background:'#00e676',color:'#000',padding:'10px 22px',borderRadius:20,margin:5,textDecoration:'none',fontWeight:'bold'}}>Shop Now</Link>
      <Link to="/checkout" style={{background:'#ffdf5d',color:'#333',padding:'10px 22px',borderRadius:20,margin:5,textDecoration:'none',fontWeight:'bold'}}>Checkout</Link>
      <Link to="/admin" style={{background:'#fff',color:'#333',padding:'10px 22px',borderRadius:20,margin:5,textDecoration:'none',fontWeight:'bold'}}>Admin</Link></div>
    </div>
    <h1 style={{fontSize:52,marginTop:50}}>Smart Gadget + Lifestyle<br/>Mega Store</h1>
    <p style={{fontSize:18,opacity:.9}}>Enterprise AI-Powered E-Commerce Command Center v2.0</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:15,marginTop:40,maxWidth:1000,marginLeft:'auto',marginRight:'auto',textAlign:'left'}}>
      {[['📱 Mobiles','Button Phone • Android • iPhone'],['🎧 Audio & Power','Earbuds • Charger • Cable • Adapter'],['💻 Computing','Laptop • Charger • Accessories'],['💾 Storage','Pendrive • Memory Card • SD Card'],['🛡️ Protection','Premium Mobile Covers'],['🕶️ Lifestyle','Sunglasses • Eye Glasses • Belt']].map((c,i)=>
        <div key={i} style={{background:'rgba(255,255,255,.15)',backdropFilter:'blur(10px)',padding:20,borderRadius:15}}><h3>{c[0]}</h3><p style={{opacity:.85,fontSize:14}}>{c[1]}</p><span style={{fontSize:12,background:'#00e676',color:'#000',padding:'4px 10px',borderRadius:10,fontWeight:'bold'}}>✓ In Stock</span></div>)}
    </div>
    <div style={{marginTop:30,opacity:.8,fontSize:14}}>✅ 6 Roles • ✅ AI Combo Engine • ✅ 14+ Products • ✅ Enterprise Grade</div>
  </div>);
}
export default function App(){return (<BrowserRouter><Routes>
<Route path="/" element={<Landing/>}/><Route path="/shop" element={<Shop/>}/><Route path="/checkout" element={<Checkout/>}/>
<Route path="/seller" element={<SellerDashboard/>}/><Route path="/admin" element={<AdminDashboard/>}/>
<Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
</Routes></BrowserRouter>);}
