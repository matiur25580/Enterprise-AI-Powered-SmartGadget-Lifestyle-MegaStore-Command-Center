import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Login from './pages/auth/Login.jsx';import Register from './pages/auth/Register.jsx';import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ShopWrapper from './pages/shop/ShopWrapper.jsx';import Checkout from './pages/shop/Checkout.jsx';
import Wishlist from './pages/shop/Wishlist.jsx';import Orders from './pages/shop/Orders.jsx';import AddressBook from './pages/shop/AddressBook.jsx';
import Terms from './pages/shop/Terms.jsx';import Settings from './pages/shop/Settings.jsx';
import SellerDashboard from './pages/seller/SellerDashboard.jsx';import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ProductDetail from './pages/shop/ProductDetail.jsx';
import ApiDocs from './pages/shop/ApiDocs.jsx';
import HRShowcase from './pages/hr/HRShowcase.jsx';
import SupportChat from './components/SupportChat.jsx';import NotifyCenter from './components/NotifyCenter.jsx';import OfferZone from './components/OfferZone.jsx';import DeliveryTrack from './components/DeliveryTrack.jsx';
import {StoreProvider,useStore} from './context/StoreContext.jsx';import {useThemeDate} from './pages/auth/AuthLayout.jsx';
function Nav(){
  const {cart,wish}=useStore();const {date,time}=useThemeDate();
  return (<><OfferZone/><nav style={{display:'flex',gap:10,padding:'10px 20px',background:'#1a237e',color:'#fff',fontSize:13,flexWrap:'wrap',alignItems:'center'}}>
    <Link to="/" style={{color:'#fff',textDecoration:'none',fontWeight:'bold'}}>🛒 MegaStore</Link>
    <Link to="/shop" style={{color:'#fff',textDecoration:'none'}}>Shop</Link>
    <Link to="/wishlist" style={{color:'#fff',textDecoration:'none'}}>❤️ ({wish.length})</Link>
    <Link to="/orders" style={{color:'#fff',textDecoration:'none'}}>📦 Orders</Link>
    <Link to="/checkout" style={{color:'#fff',textDecoration:'none'}}>🛒 ({cart.length})</Link>
    <Link to="/settings" style={{color:'#fff',textDecoration:'none'}}>⚙️</Link>
    <span style={{marginLeft:'auto',fontSize:11,opacity:.8}}>{date} | {time}</span>
  </nav><NotifyCenter/></>);
}
function Landing(){
  return (<div style={{minHeight:'80vh',background:'linear-gradient(135deg,#667eea,#764ba2)',color:'#fff',padding:40,textAlign:'center'}}>
    <OfferZone/><h1 style={{fontSize:50,marginTop:20}}>🛒 MegaStore Enterprise</h1><p>⭐ 4.8/5 | 🔥 Sale Live | 🚚 Free Delivery</p>
    <div style={{marginTop:20}}><Link to="/shop" style={{background:'#00e676',color:'#000',padding:'12px 26px',borderRadius:20,margin:5,textDecoration:'none',fontWeight:'bold'}}>Shop Now 🛍️</Link>
    <Link to="/for-hr" style={{background:'#fff',color:'#1a237e',padding:'12px 26px',borderRadius:20,margin:5,textDecoration:'none',fontWeight:'bold'}}>👨‍💻 For HR</Link></div>
    <div style={{marginTop:20}}><DeliveryTrack status="Shipped"/></div>
  </div>);
}
export default function App(){return (<StoreProvider><BrowserRouter><Nav/>
<Routes>
<Route path="/" element={<Landing/>}/><Route path="/shop" element={<ShopWrapper/>}/><Route path="/checkout" element={<Checkout/>}/>
<Route path="/wishlist" element={<Wishlist/>}/><Route path="/orders" element={<Orders/>}/><Route path="/addresses" element={<AddressBook/>}/>
<Route path="/terms" element={<Terms/>}/><Route path="/settings" element={<Settings/>}/>
<Route path="/seller" element={<SellerDashboard/>}/><Route path="/admin" element={<AdminDashboard/>}/>
<Route path="/product/:id" element={<ProductDetail/>}/><Route path="/api-docs" element={<ApiDocs/>}/><Route path="/for-hr" element={<HRShowcase/>}/>
<Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/forgot-password" element={<ForgotPassword/>}/>
</Routes><SupportChat/></BrowserRouter></StoreProvider>);
}
