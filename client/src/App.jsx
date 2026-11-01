import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Login from './pages/auth/Login.jsx';import Register from './pages/auth/Register.jsx';
import Shop from './pages/shop/Shop.jsx';import ShopWrapper from './pages/shop/ShopWrapper.jsx';import Checkout from './pages/shop/Checkout.jsx';
import SellerDashboard from './pages/seller/SellerDashboard.jsx';import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import HRShowcase from './pages/hr/HRShowcase.jsx';
import SupportChat from './components/SupportChat.jsx';
function Landing(){
  return (<div style={{minHeight:'100vh',background:'linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f093fb 100%)',color:'#fff',padding:40,textAlign:'center',fontFamily:'sans-serif'}}>
    <h1 style={{fontSize:52}}>🛒 MegaStore Enterprise</h1>
    <p>⭐ 4.8/5 | AI-Powered | 6 Roles | 20+ APIs</p>
    <div style={{marginTop:20}}>
      <Link to="/shop" style={{background:'#00e676',color:'#000',padding:'12px 26px',borderRadius:20,margin:5,textDecoration:'none',fontWeight:'bold'}}>Shop Now</Link>
      <Link to="/for-hr" style={{background:'#fff',color:'#1a237e',padding:'12px 26px',borderRadius:20,margin:5,textDecoration:'none',fontWeight:'bold'}}>👨‍💻 For HR / Interviewer</Link>
      <Link to="/admin" style={{background:'rgba(255,255,255,.2)',color:'#fff',padding:'12px 26px',borderRadius:20,margin:5,textDecoration:'none'}}>Admin</Link>
    </div>
    <div style={{marginTop:30,fontSize:14,opacity:.9}}>Built by <b>Rubel Ali</b> | MERN Full Stack Developer | 2026</div>
  </div>);
}
export default function App(){return (<BrowserRouter><>
<Routes>
<Route path="/" element={<Landing/>}/><Route path="/shop" element={<ShopWrapper/>}/><Route path="/checkout" element={<Checkout/>}/>
<Route path="/seller" element={<SellerDashboard/>}/><Route path="/admin" element={<AdminDashboard/>}/>
<Route path="/for-hr" element={<HRShowcase/>}/>
<Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
</Routes><SupportChat/></>);
}
