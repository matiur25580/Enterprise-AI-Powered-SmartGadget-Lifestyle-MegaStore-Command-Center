import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Dashboard from './pages/dashboards/Dashboard.jsx';
import Shop from './pages/shop/Shop.jsx';
function Landing(){
  const cats=[['📱 Mobiles','Button Phone, Android, iPhone'],['🎧 Audio & Power','Earbuds, Charger, Cable, Adapter'],['🛡️ Protection','Mobile Cover'],['💾 Storage','Pendrive, Memory Card'],['💻 Computing','Laptop, Charger, Accessories'],['🕶️ Lifestyle','Sunglasses, Eye Glasses, Belt']];
  return (<div style={{fontFamily:'sans-serif',background:'linear-gradient(135deg,#667eea,#764ba2,#f093fb)',minHeight:'100vh',color:'#fff',padding:'40px 20px'}}>
    <nav style={{display:'flex',justifyContent:'space-between',maxWidth:1100,margin:'0 auto'}}>
      <h2>🛒 MegaStore</h2>
      <div><Link to="/shop" style={{background:'#00e676',color:'#000',padding:'10px 20px',borderRadius:20,marginRight:10,textDecoration:'none',fontWeight:'bold'}}>Shop Now</Link>
      <Link to="/login" style={{background:'#fff',color:'#764ba2',padding:'10px 20px',borderRadius:20,marginRight:10,textDecoration:'none',fontWeight:'bold'}}>Login</Link>
      <Link to="/register" style={{background:'#ffdf5d',color:'#333',padding:'10px 20px',borderRadius:20,textDecoration:'none',fontWeight:'bold'}}>Register</Link></div>
    </nav>
    <div style={{textAlign:'center',marginTop:50,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>
      <h1 style={{fontSize:48}}>Smart Gadget + Lifestyle Mega Store</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:15,marginTop:40}}>
        {cats.map((c,i)=>(<div key={i} style={{background:'rgba(255,255,255,.15)',padding:20,borderRadius:15,textAlign:'left'}}>
          <h3>{c[0]}</h3><p style={{opacity:.85}}>{c[1]}</p></div>))}
      </div>
    </div>
  </div>);
}
export default function App(){
  return (<BrowserRouter><Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/shop" element={<Shop/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/dashboard/:role" element={<DashboardWrapper/>}/>
  </Routes></BrowserRouter>);
}
function DashboardWrapper(){const role=window.location.pathname.split('/').pop();return <Dashboard role={role}/>;}
