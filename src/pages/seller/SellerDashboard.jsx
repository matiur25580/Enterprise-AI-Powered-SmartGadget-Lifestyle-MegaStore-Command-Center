import {useState,useEffect} from 'react';import axios from 'axios';
const API='http://localhost:10000/api/product';
export default function SellerDashboard(){
  const [f,setF]=useState({name:'',category:'Mobile',subcategory:'',price:'',stock:'',brand:'',comboTags:''});
  const [list,setList]=useState([]);const [dark,setDark]=useState(false);
  const load=()=>axios.get(`${API}/all`).then(r=>setList(r.data.products||[])).catch(()=>{});
  useEffect(()=>{load()},[]);
  const submit=async(e)=>{e.preventDefault();
    try{
      const payload={...f,price:Number(f.price),stock:Number(f.stock),comboTags:f.comboTags.split(',').map(s=>s.trim().toLowerCase())};
      await axios.post(`${API}/add`,payload);
      alert('Product added successfully');setF({name:'',category:'Mobile',subcategory:'',price:'',stock:'',brand:'',comboTags:''});load();
    }catch(err){alert('Error adding product')}
  };
  const inp={width:'100%',padding:10,margin:'6px 0',borderRadius:8,border:'1px solid #ccc',boxSizing:'border-box'};
  const bg=dark?'#121212':'#f5f7fa';const card=dark?'#1e1e1e':'#fff';const txt=dark?'#fff':'#111';
  return (<div style={{minHeight:'100vh',background:bg,color:txt,padding:20}}>
    <header style={{display:'flex',justifyContent:'space-between',maxWidth:1100,margin:'0 auto 20px'}}>
      <h2>🏪 Seller Dashboard</h2>
      <button onClick={()=>setDark(!dark)} style={{padding:'8px 14px',borderRadius:15,border:'none'}}>{dark?'☀️':'🌙'}</button>
    </header>
    <div style={{display:'grid',gridTemplateColumns:'350px 1fr',gap:20,maxWidth:1100,margin:'0 auto'}}>
      <form onSubmit={submit} style={{background:card,padding:20,borderRadius:12,height:'fit-content'}}>
        <h3>Add Product</h3>
        <input placeholder="Product Name - ex: iPhone 15" style={inp} value={f.name} onChange={e=>setF({...f,name:e.target.value})} required/>
        <select style={inp} value={f.category} onChange={e=>setF({...f,category:e.target.value})}>
          <option>Mobile</option><option>AudioPower</option><option>Protection</option><option>Storage</option><option>Computing</option><option>Lifestyle</option>
        </select>
        <input placeholder="Subcategory - iPhone, Earbuds, Charger..." style={inp} value={f.subcategory} onChange={e=>setF({...f,subcategory:e.target.value})} required/>
        <input placeholder="Price ₹" type="number" style={inp} value={f.price} onChange={e=>setF({...f,price:e.target.value})} required/>
        <input placeholder="Stock" type="number" style={inp} value={f.stock} onChange={e=>setF({...f,stock:e.target.value})} required/>
        <input placeholder="Brand" style={inp} value={f.brand} onChange={e=>setF({...f,brand:e.target.value})}/>
        <input placeholder="comboTags comma diye - iphone,cover,charger" style={inp} value={f.comboTags} onChange={e=>setF({...f,comboTags:e.target.value})}/>
        <button style={{...inp,background:'#00c853',color:'#fff',fontWeight:'bold',border:'none'}}>Add Product ✓</button>
      </form>
      <div style={{background:card,padding:20,borderRadius:12}}>
        <h3>My Products ({list.length})</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:10}}>
          {list.map(p=><div key={p._id} style={{background:bg,padding:12,borderRadius:8}}>
            <b>{p.name}</b><br/><small>{p.subcategory}</small><br/><b style={{color:'#2a5298'}}>₹{p.price}</b> | Stock:{p.stock}<br/>
            <small style={{color:'#00c853'}}>✓ Listed successfully</small>
          </div>)}
        </div>
      </div>
    </div>
  </div>);
}
