import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Login from './pages/auth/Login.jsx';import Register from './pages/auth/Register.jsx';
import Shop from './pages/shop/Shop.jsx';import ShopWrapper from './pages/shop/ShopWrapper.jsx';import Checkout from './pages/shop/Checkout.jsx';
import SellerDashboard from './pages/seller/SellerDashboard.jsx';import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import SupportChat from './components/SupportChat.jsx';
function Landing(){
  return (<div style={{minHeight:'100vh',background:'linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f093fb 100%)',color:'#fff',padding:40,textAlign:'center',fontFamily:'sans-serif'}}>
    <h1 style={{fontSize:52}}>🛒 Smart Gadget + Lifestyle Mega Store</h1>
    <p>⭐ 4.8/5 Rated | 50k+ Happy Customers | Enterprise v3.0</p>
    <div style={{marginTop:20}}><Link to="/shop" style={{background:'#00e676',color:'#000',padding:'12px 26px',borderRadius:20,margin:5,textDecoration:'none',fontWeight:'bold'}}>Shop Now 🛍️</Link>
    <Link to="/admin" style={{background:'#fff',color:'#333',padding:'12px 26px',borderRadius:20,margin:5,textDecoration:'none',fontWeight:'bold'}}>Admin 📊</Link></div>
    <div style={{marginTop:30,display:'flex',justifyContent:'center',gap:20,flexWrap:'wrap',fontSize:14}}>
      <span>✅ 7-Day Return</span><span>✅ Free Delivery</span><span>✅ 1yr Warranty</span><span>✅ COD Available</span><span>✅ GST Invoice</span>
    </div>
    <div style={{marginTop:20,background:'rgba(255,255,255,.15)',padding:15,borderRadius:10,maxWidth:600,marginLeft:'auto',marginRight:'auto'}}>
      <b>💬 Customer Reviews:</b><br/>"Best mega store! iPhone combo te onek save holo" - Rahul ⭐⭐⭐⭐⭐<br/>"Delivery super fast, support awesome" - Priya ⭐⭐⭐⭐⭐
    </div>
  </div>);
}
export default function App(){return (<BrowserRouter><>
<Routes>
<Route path="/" element={<Landing/>}/><Route path="/shop" element={<ShopWrapper/>}/><Route path="/checkout" element={<Checkout/>}/>
<Route path="/seller" element={<SellerDashboard/>}/><Route path="/admin" element={<AdminDashboard/>}/>
<Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
</Routes><SupportChat/></>);
}
