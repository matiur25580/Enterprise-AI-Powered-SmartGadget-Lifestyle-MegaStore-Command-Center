import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Login from './pages/auth/Login.jsx';import Register from './pages/auth/Register.jsx';
import Shop from './pages/shop/Shop.jsx';import SellerDashboard from './pages/seller/SellerDashboard.jsx';import AdminDashboard from './pages/admin/AdminDashboard.jsx';
function Landing(){
  return (<div style={{minHeight:'100vh',background:'linear-gradient(135deg,#667eea,#764ba2)',color:'#fff',padding:40,textAlign:'center',fontFamily:'sans-serif'}}>
    <h1>🛒 Smart Gadget + Lifestyle Mega Store</h1><p>AI-Powered Enterprise E-Commerce</p>
    <div style={{marginTop:20}}><Link to="/shop" style={{background:'#00e676',padding:'10px 20px',borderRadius:20,margin:5,textDecoration:'none',color:'#000',fontWeight:'bold'}}>Shop</Link>
    <Link to="/seller" style={{background:'#ffdf5d',padding:'10px 20px',borderRadius:20,margin:5,textDecoration:'none',color:'#000',fontWeight:'bold'}}>Seller</Link>
    <Link to="/admin" style={{background:'#fff',padding:'10px 20px',borderRadius:20,margin:5,textDecoration:'none',color:'#333',fontWeight:'bold'}}>Admin</Link>
    <Link to="/login" style={{background:'#fff',padding:'10px 20px',borderRadius:20,margin:5,textDecoration:'none',color:'#333'}}>Login</Link></div>
    <div style={{marginTop:30,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12,maxWidth:800,marginLeft:'auto',marginRight:'auto'}}>
      {['📱 Mobiles: Button, Android, iPhone','🎧 Audio: Earbuds, Charger, Cable','💻 Computing: Laptop, Accessories','🕶️ Lifestyle: Sunglasses, Belt'].map((x,i)=><div key={i} style={{background:'rgba(255,255,255,.2)',padding:15,borderRadius:10}}>{x}</div>)}
    </div></div>);
}
export default function App(){return (<BrowserRouter><Routes>
<Route path="/" element={<Landing/>}/><Route path="/shop" element={<Shop/>}/>
<Route path="/seller" element={<SellerDashboard/>}/><Route path="/admin" element={<AdminDashboard/>}/>
<Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
</Routes></BrowserRouter>);}
