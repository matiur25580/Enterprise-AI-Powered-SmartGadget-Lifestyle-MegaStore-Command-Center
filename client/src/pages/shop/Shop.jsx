import {useEffect,useState} from 'react';import axios from 'axios';
const PAPI='http://localhost:10000/api/product';
export default function Shop(){
  const [products,setProducts]=useState([]);
  const [cart,setCart]=useState([]);const [wish,setWish]=useState([]);
  const [q,setQ]=useState({search:'',category:'all',minPrice:'',maxPrice:'',sort:'createdAt',order:'desc',page:1});
  const [pages,setPages]=useState(1);const [total,setTotal]=useState(0);
  const cats=['all','Mobile','AudioPower','Protection','Storage','Computing','Lifestyle'];

  const load=async()=>{
    try{
      const params=new URLSearchParams({...q,limit:12}).toString();
      const r=await axios.get(`${PAPI}/all?${q.search||q.category!=='all'||q.page>1?params:'limit=12'}`);
      // fallback simple
      const r2=r.data.products||[];
      setProducts(r2);setTotal(r.data.total||r2.length);setPages(r.data.pages||1);
    }catch{setProducts([])}
  };
  useEffect(()=>{load()},[]);

  const applyFilter=async()=>{
    try{
      const params=new URLSearchParams({search:q.search,category:q.category,minPrice:q.minPrice,maxPrice:q.maxPrice,sort:q.sort,order:q.order,page:q.page,limit:12}).toString();
      const r=await axios.get(`${PAPI}/all?${params}`);
      setProducts(r.data.products||[]);setTotal(r.data.total||0);setPages(r.data.pages||1);
      alert('Filter applied successfully');
    }catch{alert('Filter error')}
  };

  const inp={padding:8,borderRadius:8,border:'1px solid #ccc',margin:'4px'};
  return (<div style={{padding:20,fontFamily:'sans-serif',background:'#f5f7fa',minHeight:'100vh'}}>
    <h2>🛒 MegaStore Enterprise Shop</h2>
    <div style={{background:'#fff',padding:15,borderRadius:10,marginBottom:15,display:'flex',flexWrap:'wrap',gap:5,alignItems:'center'}}>
      <input placeholder="🔍 Search iPhone, Laptop..." value={q.search} onChange={e=>setQ({...q,search:e.target.value})} style={inp}/>
      <select value={q.category} onChange={e=>setQ({...q,category:e.target.value})} style={inp}>{cats.map(c=><option key={c} value={c}>{c}</option>)}</select>
      <input placeholder="Min ₹" type="number" value={q.minPrice} onChange={e=>setQ({...q,minPrice:e.target.value})} style={{...inp,width:90}}/>
      <input placeholder="Max ₹" type="number" value={q.maxPrice} onChange={e=>setQ({...q,maxPrice:e.target.value})} style={{...inp,width:90}}/>
      <select value={q.sort} onChange={e=>setQ({...q,sort:e.target.value})} style={inp}><option value="createdAt">Newest</option><option value="price">Price</option><option value="name">Name</option></select>
      <select value={q.order} onChange={e=>setQ({...q,order:e.target.value})} style={inp}><option value="desc">Desc</option><option value="asc">Asc</option></select>
      <button onClick={applyFilter} style={{...inp,background:'#2a5298',color:'#fff',border:'none',fontWeight:'bold'}}>Apply Filter ✓</button>
      <span style={{marginLeft:10}}>Total: {total} | Cart: {cart.length} | ❤️ {wish.length}</span>
    </div>

    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
      {products.map(p=>(
        <div key={p._id||p.name} style={{background:'#fff',padding:15,borderRadius:10,boxShadow:'0 2px 6px rgba(0,0,0,.08)'}}>
          <div style={{background:'#667eea',color:'#fff',padding:'4px 8px',borderRadius:5,fontSize:11,display:'inline-block'}}>{p.category||p.cat}</div>
          <h4 style={{margin:'8px 0'}}>{p.name}</h4>
          <small>{p.subcategory} | {p.brand}</small>
          <h3 style={{color:'#2a5298'}}>₹{p.price?.toLocaleString('en-IN')}</h3>
          <small>Stock: {p.stock||'—'}</small>
          <div style={{display:'flex',gap:6,marginTop:8}}>
            <button onClick={()=>{setCart([...cart,p]);alert('Added to cart successfully')}} style={{flex:1,padding:9,background:'#00c853',color:'#fff',border:'none',borderRadius:7,fontWeight:'bold'}}>Add to Cart</button>
            <button onClick={()=>{setWish([...wish,p]);alert('Added to wishlist successfully')}} style={{padding:9,background:'#eee',border:'none',borderRadius:7}}>❤️</button>
          </div>
        </div>
      ))}
    </div>
    {products.length===0 && <p style={{textAlign:'center',marginTop:30}}>No products found. Backend e <b>POST /api/product/seed</b> hit koro tumi.</p>}

    <div style={{textAlign:'center',marginTop:20}}>
      <button disabled={q.page<=1} onClick={()=>setQ({...q,page:q.page-1})} style={inp}>← Prev</button>
      <span style={{margin:'0 10px'}}>Page {q.page} / {pages}</span>
      <button disabled={q.page>=pages} onClick={()=>setQ({...q,page:q.page+1})} style={inp}>Next →</button>
    </div>

    <div style={{marginTop:20,background:'#e8f5e9',padding:15,borderRadius:10}}>
      <h3>🤖 AI Perfect Combo Engine</h3><p>iPhone 15 + Cover + 20W Adapter + Earbuds = <b style={{color:'#00c853'}}>Perfect Match ✓</b></p>
      <p>Laptop + Charger + Pendrive 128GB = <b style={{color:'#00c853'}}>Perfect Match ✓</b></p>
    </div>
  </div>);
}
