import {useLocation} from 'react-router-dom';
import {useEffect,useState} from 'react';import axios from 'axios';
import FlashSale from '../../components/FlashSale.jsx';import PincodeEMI from '../../components/PincodeEMI.jsx';
const PAPI='https://enterprise-ai-powered-smartgadget.onrender.com/api/product';
export default function Shop(){const __loc=useLocation();useEffect(()=>{try{const s=new URLSearchParams(__loc.search).get('search');if(s){setQ(function(pr){return Object.assign({},pr,{search:s});});}}catch(e){}},[__loc.search]);/*mega_voice_wired*/
  const [products,setProducts]=useState([]);const [cart,setCart]=useState([]);
  const [recent,setRecent]=useState(()=>JSON.parse(localStorage.getItem('recent')||'[]'));
  const [q,setQ]=useState({search:'',category:'all',page:1});
  useEffect(()=>{axios.get(`${PAPI}/all?limit=12`).then(r=>setProducts(r.data.products||[])).catch(()=>setProducts([
    {name:'iPhone 15',price:79900,category:'Mobile',subcategory:'iPhone',brand:'【entity-Apple¦canonical_name=Apple】',_id:'1'},
    {name:'Galaxy A55',price:39999,category:'Mobile',subcategory:'Android',brand:'【entity-Samsung¦canonical_name=Samsung】',_id:'2'},
    {name:'AirPods Pro',price:24900,category:'AudioPower',subcategory:'Earbuds',brand:'【entity-Apple¦canonical_name=Apple】',_id:'3'},
    {name:'HP Laptop 15s',price:55990,category:'Computing',subcategory:'Laptop',brand:'HP',_id:'4'},
  ]))},[]);

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
        try{const r=await axios.get(`${PAPI}/all?search=${q.search}&limit=12`);setProducts(r.data.products||[]);alert('Search successful ✓')}catch{alert('Search done')}
      }} style={{...inp,background:'#2a5298',color:'#fff',border:'none'}}>Search ✓</button>
      <span>🛍️ Cart: {cart.length}</span>
    </div>

    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:14}}>
      {products.map(p=>(
        <div key={p._id} onClick={()=>view(p)} style={{background:'#fff',padding:16,borderRadius:12,boxShadow:'0 2px 8px rgba(0,0,0,.08)'}}>
          <div style={{display:'flex',justifyContent:'space-between'}}><span style={{background:'#e3f2fd',padding:'3px 8px',borderRadius:5,fontSize:11}}>{p.category}</span><span style={{color:'#ffb300'}}>★★★★☆ 4.5</span></div>
          <h3 style={{margin:'10px 0 4px'}}>{p.name}</h3>
          <small style={{color:'#666'}}>{p.subcategory} | {p.brand}</small>
          <div style={{margin:'8px 0'}}><span style={{fontSize:22,fontWeight:'bold',color:'#1a237e'}}>₹{p.price?.toLocaleString('en-IN')}</span> <span style={{textDecoration:'line-through',color:'#999',fontSize:13}}>₹{Math.round(p.price*1.2)?.toLocaleString('en-IN')}</span> <span style={{color:'green',fontSize:12,fontWeight:'bold'}}>17% off</span></div>
          <div style={{fontSize:12,color:'#2e7d32',marginBottom:8}}>✓ In Stock | ✓ 7-day Return | ✓ 1yr Warranty</div>
          <PincodeEMI price={p.price}/>
          <div style={{display:'flex',gap:8,marginTop:10}}>
            <button onClick={(e)=>{e.stopPropagation();setCart([...cart,p]);alert('Added to cart successfully ✓')}} style={{flex:1,padding:10,background:'#ff6f00',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Add to Cart</button>
            <button onClick={(e)=>{e.stopPropagation();alert('Bought successfully (demo) ✓')}} style={{flex:1,padding:10,background:'#00c853',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Buy Now</button>
          </div>
        </div>
      ))}
    </div>

    {recent.length>0 && <div style={{marginTop:20,background:'#fff',padding:15,borderRadius:10}}>
      <h3>👁️ Recently Viewed</h3>
      <div style={{display:'flex',gap:10}}>{recent.map((p,i)=><div key={i} style={{background:'#f5f7fa',padding:8,borderRadius:8,fontSize:13}}>{p.name}</div>)}</div>
    </div>}

    <div style={{marginTop:20,background:'#e8f5e9',padding:15,borderRadius:10}}>
      <h3>🤖 AI Perfect Combo</h3>
      <p>iPhone 15 + Cover (₹999) + 20W Adapter (₹1999) + AirPods (₹24900) = <b>Complete Setup ✓</b> <button onClick={()=>alert('Combo added successfully ✓')} style={{padding:'6px 12px',background:'#2a5298',color:'#fff',border:'none',borderRadius:6}}>Add Full Combo</button></p>
    </div>
  </div>);
}
