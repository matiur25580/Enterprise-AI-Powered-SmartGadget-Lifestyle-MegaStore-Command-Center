import {useLocation} from 'react-router-dom';
import {useEffect,useState} from 'react';import axios from 'axios';import {useNavigate} from 'react-router-dom';
import {useStore} from '../../context/StoreContext.jsx';
import FlashSale from '../../components/FlashSale.jsx';import PincodeEMI from '../../components/PincodeEMI.jsx';
const API=(import.meta.env.VITE_API_URL||'https://enterprise-ai-powered-smartgadget.onrender.com').replace(/\/$/,'');
export default function Shop(){const __loc=useLocation();const navigate=useNavigate();const {addCart}=useStore();useEffect(()=>{try{const s=new URLSearchParams(__loc.search).get('search');if(s){setQ(function(pr){return Object.assign({},pr,{search:s});});}}catch(e){}},[__loc.search]);/*mega_voice_wired*/
  const [products,setProducts]=useState([]);const [error,setError]=useState('');
  const [recent,setRecent]=useState(()=>JSON.parse(localStorage.getItem('recent')||'[]'));
  const [q,setQ]=useState({search:'',category:'all',page:1});
  useEffect(()=>{axios.get(`${API}/api/product/all`,{params:{limit:12}}).then(r=>setProducts(r.data.products||[])).catch(()=>setError('Products could not be loaded. Check the API connection and try again.'))},[]);

  const view=(p)=>{
    const nr=[p,...recent.filter(x=>x._id!==p._id)].slice(0,5);
    setRecent(nr);localStorage.setItem('recent',JSON.stringify(nr));
  };

  const trending=products.slice(0,3);
  const inp={padding:8,borderRadius:8,border:'1px solid #ccc'};
  return (<div style={{padding:20,background:'#f5f7fa',minHeight:'100vh',fontFamily:'sans-serif'}}>
    <FlashSale/>
    <h2>🛒 MegaStore - Most Demanded</h2>

    {trending.length>0 && <div style={{background:'#fff',padding:15,borderRadius:10,marginBottom:15}}>
      <h3>🔥 Trending Now</h3>
      <div style={{display:'flex',gap:10,overflowX:'auto'}}>
        {trending.map((p,i)=><div key={i} style={{minWidth:180,background:'#f5f7fa',padding:10,borderRadius:8}}><b>#{i+1} {p.name}</b><br/>₹{p.price?.toLocaleString('en-IN')} <span style={{color:'green',fontSize:12}}>▲ Hot</span></div>)}
      </div>
    </div>}

    <div style={{display:'flex',gap:8,marginBottom:15}}>
      <input placeholder="🔍 Search..." value={q.search} onChange={e=>setQ({...q,search:e.target.value})} style={{...inp,flex:1}}/>
      <button onClick={async()=>{
        try{setError('');const r=await axios.get(`${API}/api/product/all`,{params:{search:q.search,limit:12}});setProducts(r.data.products||[])}catch{setError('Search failed. Please check the API connection and try again.')}
      }} style={{...inp,background:'#2a5298',color:'#fff',border:'none'}}>Search ✓</button>
    </div>

    {error&&<p role="alert" style={{padding:12,background:'#ffebee',color:'#b71c1c',borderRadius:8}}>{error}</p>}
    {!error&&products.length===0&&<p style={{padding:24,textAlign:'center'}}>No products found. Try another search or check back later.</p>}

    <div className="catalog-grid catalog-shop-grid">
      {products.map(p=>(
        <div key={p._id} onClick={()=>{view(p);navigate(`/product/${p._id}`)}} style={{background:'#fff',padding:16,borderRadius:12,boxShadow:'0 2px 8px rgba(0,0,0,.08)',cursor:'pointer'}}>
          <div><span style={{background:'#e3f2fd',padding:'3px 8px',borderRadius:5,fontSize:11}}>{p.category}</span></div>
          <h3 style={{margin:'10px 0 4px'}}>{p.name}</h3>
          <small style={{color:'#666'}}>{p.subcategory} | {p.brand}</small>
          <div style={{margin:'8px 0'}}><span style={{fontSize:22,fontWeight:'bold',color:'#1a237e'}}>₹{p.price?.toLocaleString('en-IN')}</span>{p.mrp>p.price&&<><span style={{textDecoration:'line-through',color:'#999',fontSize:13,marginLeft:8}}>₹{p.mrp.toLocaleString('en-IN')}</span><span style={{color:'green',fontSize:12,fontWeight:'bold',marginLeft:6}}>{Math.round((p.mrp-p.price)/p.mrp*100)}% off</span></>}</div>
          <div style={{fontSize:12,color:p.stock>0?'#2e7d32':'#b71c1c',marginBottom:8}}>{p.stock>0?`${p.stock} in stock`:'Out of stock'}</div>
          <PincodeEMI price={p.price}/>
          <div style={{display:'flex',gap:8,marginTop:10}}>
            <button disabled={!p.stock} onClick={(e)=>{e.stopPropagation();addCart(p)}} style={{flex:1,padding:10,background:'#ff6f00',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold',opacity:p.stock?1:.5}}>Add to Cart</button>
            <button disabled={!p.stock} onClick={(e)=>{e.stopPropagation();addCart(p);navigate('/checkout')}} style={{flex:1,padding:10,background:'#00c853',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold',opacity:p.stock?1:.5}}>Buy Now</button>
          </div>
        </div>
      ))}
    </div>

    {recent.length>0 && <div style={{marginTop:20,background:'#fff',padding:15,borderRadius:10}}>
      <h3>👁️ Recently Viewed</h3>
      <div style={{display:'flex',gap:10}}>{recent.map((p,i)=><div key={i} style={{background:'#f5f7fa',padding:8,borderRadius:8,fontSize:13}}>{p.name}</div>)}</div>
    </div>}

  </div>);
}
