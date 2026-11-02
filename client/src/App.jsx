import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Login from './pages/auth/Login.jsx';import Register from './pages/auth/Register.jsx';import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ShopWrapper from './pages/shop/ShopWrapper.jsx';import Checkout from './pages/shop/Checkout.jsx';
import Wishlist from './pages/shop/Wishlist.jsx';import Orders from './pages/shop/Orders.jsx';import AddressBook from './pages/shop/AddressBook.jsx';
import Terms from './pages/shop/Terms.jsx';import Settings from './pages/shop/Settings.jsx';
import SellerDashboard from './pages/seller/SellerDashboard.jsx';import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ProductDetail from './pages/shop/ProductDetailLive.jsx';
import ApiDocs from './pages/shop/ApiDocs.jsx';
import BulkUpload from './pages/seller/BulkUpload.jsx';
import HRShowcase from './pages/hr/HRShowcase.jsx';
import RouteErrorBoundary from './components/RouteErrorBoundary.jsx';
import SupportChat from './components/SupportChat.jsx';import NotifyCenter from './components/NotifyCenter.jsx';import OfferZone from './components/OfferZone.jsx';
import {StoreProvider,useStore} from './context/StoreContext.jsx';import {useThemeDate} from './pages/auth/AuthLayout.jsx';
import HomeProducts from './components/HomeProducts.jsx';
function Nav(){
  const {cart,wish}=useStore();const {date,time}=useThemeDate();
  return (<><OfferZone/><nav style={{display:'flex',gap:10,padding:'10px 20px',background:'#212122',color:'#fff',fontSize:13,flexWrap:'wrap',alignItems:'center'}}>
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
  return (<main style={{minHeight:'100vh',background:'#060606',color:'#fff'}}>
    <section style={{padding:'64px 24px 40px',borderBottom:'1px solid #353839'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <p style={{color:'#00e676',fontSize:12,fontWeight:700,letterSpacing:2}}>MEGASTORE / EVERYDAY COMMERCE</p>
        <h1 style={{fontSize:48,lineHeight:1.08,maxWidth:720,margin:'18px 0'}}>Useful tech and lifestyle, in one place.</h1>
        <p style={{maxWidth:600,color:'#b7c0c8',lineHeight:1.6}}>Browse the live catalog, check current stock, and place a cash-on-delivery order.</p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:24}}>
          <Link to="/shop" style={{background:'#00e676',color:'#000',padding:'12px 20px',borderRadius:6,textDecoration:'none',fontWeight:700}}>Browse products</Link>
          <Link to="/for-hr" style={{background:'transparent',color:'#fff',border:'1px solid #555',padding:'12px 20px',borderRadius:6,textDecoration:'none'}}>Project overview</Link>
        </div>
      </div>
    </section>
    <div style={{maxWidth:1120,margin:'0 auto',paddingTop:20}}><HomeProducts/></div>
  </main>);
}
export default function App(){return (<StoreProvider><BrowserRouter><Nav/>
<RouteErrorBoundary><Routes>
<Route path="/" element={<Landing/>}/><Route path="/shop" element={<ShopWrapper/>}/><Route path="/checkout" element={<Checkout/>}/>
<Route path="/wishlist" element={<Wishlist/>}/><Route path="/orders" element={<Orders/>}/><Route path="/addresses" element={<AddressBook/>}/>
<Route path="/terms" element={<Terms/>}/><Route path="/settings" element={<Settings/>}/>
<Route path="/seller" element={<SellerDashboard/>}/><Route path="/admin" element={<AdminDashboard/>}/>
<Route path="/product/:id" element={<ProductDetail/>}/><Route path="/api-docs" element={<ApiDocs/>}/><Route path="/seller/bulk" element={<BulkUpload/>}/><Route path="/for-hr" element={<HRShowcase/>}/>
<Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/forgot-password" element={<ForgotPassword/>}/>
</Routes></RouteErrorBoundary><SupportChat/></BrowserRouter></StoreProvider>);
}
