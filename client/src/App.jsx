import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Login from './pages/auth/Login.jsx';import Register from './pages/auth/Register.jsx';import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ShopWrapper from './pages/shop/ShopWrapper.jsx';import Checkout from './pages/shop/Checkout.jsx';
import SellerDashboard from './pages/seller/SellerDashboard.jsx';import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import HRShowcase from './pages/hr/HRShowcase.jsx';import SupportChat from './components/SupportChat.jsx';
import {useThemeDate} from './pages/auth/AuthLayout.jsx';
function Landing(){
  const {dark,setDark,date,time}=useThemeDate();
  return (<div style={{minHeight:'100vh',background:dark?'#121212':'linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f093fb 100%)',color:'#fff',padding:'20px 40px',fontFamily:'sans-serif'}}>
    <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',maxWidth:1100,margin:'0 auto'}}>
      <h2>🛒 MegaStore</h2>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <span style={{fontSize:12,opacity:.8}}>{date} | {time}</span>
        <button onClick={()=>setDark(!dark)} style={{padding:'6px 12px',borderRadius:15,border:'none'}}>{dark?'☀️':'🌙'}</button>
        <Link to="/shop" style={{background:'#00e676',color:'#000',padding:'10px 20px',borderRadius:20,textDecoration:'none',fontWeight:'bold'}}>Shop</Link>
        <Link to="/login" style={{background:'#fff',color:'#333',padding:'10px 20px',borderRadius:20,textDecoration:'none',fontWeight:'bold'}}>Login</Link>
      </div>
    </nav>
    <div style={{textAlign:'center',marginTop:60,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>
      <h1 style={{fontSize:54}}>Smart Gadget + Lifestyle<br/>Mega Store</h1>
      <p style={{fontSize:18,opacity:.9}}>Enterprise AI-Powered E-Commerce Command Center</p>
      <div style={{marginTop:25}}>
        <Link to="/for-hr" style={{background:'#fff',color:'#1a237e',padding:'12px 26px',borderRadius:20,margin:5,textDecoration:'none',fontWeight:'bold'}}>👨‍💻 For HR</Link>
        <Link to="/register" style={{background:'#ffdf5d',color:'#333',padding:'12px 26px',borderRadius:20,margin:5,textDecoration:'none',fontWeight:'bold'}}>Register</Link>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12,marginTop:40,textAlign:'left'}}>
        {[['📱 Mobiles','Button • Android • iPhone'],['🎧 Audio','Earbuds • Charger • Cable'],['💻 Computing','Laptop • Accessories'],['🕶️ Lifestyle','Sunglasses • Belt']].map((c,i)=><div key={i} style={{background:'rgba(255,255,255,.15)',padding:18,borderRadius:12}}><h3>{c[0]}</h3><p style={{fontSize:13,opacity:.85}}>{c[1]}</p></div>)}
      </div>
    </div>
  </div>);
}
export default function App(){return (<BrowserRouter><>
<Routes>
<Route path="/" element={<Landing/>}/><Route path="/shop" element={<ShopWrapper/>}/><Route path="/checkout" element={<Checkout/>}/>
<Route path="/seller" element={<SellerDashboard/>}/><Route path="/admin" element={<AdminDashboard/>}/>
<Route path="/for-hr" element={<HRShowcase/>}/>
<Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/forgot-password" element={<ForgotPassword/>}/>
</Routes><SupportChat/></>); }
