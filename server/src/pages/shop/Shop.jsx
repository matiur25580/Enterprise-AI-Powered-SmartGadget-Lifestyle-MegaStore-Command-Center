import {useEffect,useState} from 'react';import axios from 'axios';
const API='http://localhost:10000/api/product';
export default function Shop(){
  const [products,setProducts]=useState([]);
  const [cart,setCart]=useState([]);
  const [combo,setCombo]=useState(null);
  const [dark,setDark]=useState(false);
  useEffect(()=>{axios.get(`${API}/all`).then(r=>setProducts(r.data.products||[])).catch(()=>setProducts([]))},[]);
  const addCart=(p)=>{
    setCart([...cart,p]);
    axios.get(`${API}/combo/${p._id}`).then(r=>setCombo(r.data)).catch(()=>{});
  };
  const bg=dark?'#121212':'#f5f7fa';const card=dark?'#1e1e1e':'#fff';const txt=dark?'#fff':'#111';
  return (<div style={{minHeight:'100vh',background:bg,color:txt,padding:20}}>
    <header style={{display:'flex',justifyContent:'space-between',maxWidth:1100,margin:'0 auto 20px'}}>
      <h2>🛒 MegaStore Shop</h2>
      <div><span>🛍️ Cart: {cart.length} </span>
      <button onClick={()=>setDark(!dark)} style={{marginLeft:10,padding:'6px 12px',borderRadius:15,border:'none'}}>{dark?'☀️':'🌙'}</button></div>
    </header>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:15,maxWidth:1100,margin:'0 auto'}}>
      {products.map(p=>(
        <div key={p._id} style={{background:card,padding:15,borderRadius:12,boxShadow:'0 2px 8px rgba(0,0,0,.1)'}}>
          <h4>{p.name}</h4>
          <small>{p.subcategory} | {p.brand}</small>
          <h3 style={{color:'#2a5298'}}>₹{p.price}</h3>
          <button onClick={()=>addCart(p)} style={{width:'100%',padding:10,background:'#00c853',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Add to Cart ✓</button>
        </div>
      ))}
    </div>
    {combo && (
      <div style={{maxWidth:1100,margin:'30px auto',background:card,padding:20,borderRadius:12,border:'2px solid #00c853'}}>
        <h3>🤖 AI Suggests Perfect Combo for {combo.main}</h3>
        <p style={{color:'#00c853'}}>✓ Ei jinis gulo ek sathe perfect!</p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          {combo.perfect.map(p=>(
            <div key={p._id} style={{background:bg,padding:10,borderRadius:8,minWidth:150}}>
              <b>{p.name}</b><br/><span>₹{p.price}</span><br/>
              <button onClick={()=>setCart([...cart,p])} style={{marginTop:5,padding:'5px 10px',background:'#2a5298',color:'#fff',border:'none',borderRadius:6}}>Add +</button>
            </div>
          ))}
        </div>
      </div>
    )}
    {cart.length>0 && <div style={{position:'fixed',bottom:20,right:20,background:'#2a5298',color:'#fff',padding:'15px 20px',borderRadius:12}}>
      Total: ₹{cart.reduce((s,p)=>s+p.price,0)} | Items: {cart.length} ✓
    </div>}
  </div>);
}
