import {useEffect,useState} from 'react';import axios from 'axios';
const PAPI='http://localhost:10000/api/product';
const EAPI='http://localhost:10000/api/extra';
export default function Shop(){
  const [products,setProducts]=useState([]);
  const [cart,setCart]=useState([]);
  const [wishlist,setWishlist]=useState(()=>JSON.parse(localStorage.getItem('wishlist')||'[]'));
  const [combo,setCombo]=useState(null);
  const [coupon,setCoupon]=useState('');const [discount,setDiscount]=useState(0);
  const [reviews,setReviews]=useState({});const [dark,setDark]=useState(false);

  useEffect(()=>{axios.get(`${PAPI}/all`).then(r=>setProducts(r.data.products||[])).catch(()=>{})},[]);

  const toggleWish=(p)=>{
    let nw; if(wishlist.find(x=>x._id===p._id)){nw=wishlist.filter(x=>x._id!==p._id); alert('Removed from wishlist');}
    else{nw=[...wishlist,p]; alert('Added to wishlist successfully');}
    setWishlist(nw); localStorage.setItem('wishlist',JSON.stringify(nw));
  };

  const addCart=(p)=>{
    setCart([...cart,p]); alert('Added to cart successfully');
    axios.get(`${PAPI}/combo/${p._id}`).then(r=>setCombo(r.data)).catch(()=>{});
    axios.get(`${EAPI}/review/${p._id}`).then(r=>setReviews({...reviews,[p._id]:r.data.reviews})).catch(()=>{});
  };

  const applyCoupon=async()=>{
    try{const r=await axios.post(`${EAPI}/coupon/apply`,{code:coupon});
    setDiscount(r.data.discount); alert(`Coupon applied successfully! ${r.data.discount}% off`);}
    catch{alert('Invalid coupon')}
  };

  const addReview=async(pid)=>{
    const rating=prompt('Rating 1-5 dao:');const comment=prompt('Review likho:');
    if(!rating) return;
    try{await axios.post(`${EAPI}/review/add`,{productId:pid,customerEmail:'guest@megastore.com',rating:Number(rating),comment});
    alert('Review added successfully');
    const r=await axios.get(`${EAPI}/review/${pid}`);setReviews({...reviews,[pid]:r.data.reviews});}
    catch{alert('Review error')}
  };

  const total=cart.reduce((s,p)=>s+p.price,0);
  const finalTotal=total - (total*discount/100);

  const bg=dark?'#121212':'#f5f7fa';const card=dark?'#1e1e1e':'#fff';const txt=dark?'#fff':'#111';
  return (<div style={{minHeight:'100vh',background:bg,color:txt,padding:20}}>
    <header style={{display:'flex',justifyContent:'space-between',maxWidth:1100,margin:'0 auto 20px',flexWrap:'wrap',gap:10}}>
      <h2>🛒 MegaStore Shop</h2>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <input placeholder="Coupon code" value={coupon} onChange={e=>setCoupon(e.target.value)} style={{padding:8,borderRadius:8,border:'1px solid #ccc'}}/>
        <button onClick={applyCoupon} style={{padding:'8px 12px',background:'#ff9800',color:'#fff',border:'none',borderRadius:8}}>Apply</button>
        <span>🛍️ {cart.length} | ❤️ {wishlist.length}</span>
        <button onClick={()=>setDark(!dark)} style={{padding:'6px 12px',borderRadius:15,border:'none'}}>{dark?'☀️':'🌙'}</button>
      </div>
    </header>

    {discount>0 && <div style={{maxWidth:1100,margin:'0 auto 15px',background:'#e8f5e9',padding:10,borderRadius:8,color:'#2e7d32'}}>🎟️ Coupon Applied! {discount}% OFF - Final: ₹{finalTotal.toFixed(0)}</div>}

    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:15,maxWidth:1100,margin:'0 auto'}}>
      {products.map(p=>(
        <div key={p._id} style={{background:card,padding:15,borderRadius:12}}>
          <h4>{p.name}</h4><small>{p.subcategory} | {p.brand}</small>
          <h3 style={{color:'#2a5298'}}>₹{p.price}</h3>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>addCart(p)} style={{flex:1,padding:10,background:'#00c853',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Add to Cart</button>
            <button onClick={()=>toggleWish(p)} style={{padding:10,background:wishlist.find(x=>x._id===p._id)?'#ff5252':'#eee',border:'none',borderRadius:8}}>❤️</button>
          </div>
          <button onClick={()=>addReview(p._id)} style={{marginTop:8,width:'100%',padding:8,background:'#2a5298',color:'#fff',border:'none',borderRadius:8}}>⭐ Review dao</button>
          {reviews[p._id]?.length>0 && <div style={{marginTop:10,background:bg,padding:8,borderRadius:8}}>
            <b>Reviews ({reviews[p._id].length}):</b>
            {reviews[p._id].slice(0,2).map((r,i)=><div key={i} style={{fontSize:13}}>⭐{r.rating} - {r.comment}</div>)}
          </div>}
        </div>
      ))}
    </div>

    {combo && <div style={{maxWidth:1100,margin:'30px auto',background:card,padding:20,borderRadius:12,border:'2px solid #00c853'}}>
      <h3>🤖 AI Perfect Combo for {combo.main}</h3>
      <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
        {combo.perfect.map(p=><div key={p._id} style={{background:bg,padding:10,borderRadius:8,minWidth:150}}><b>{p.name}</b><br/>₹{p.price}<br/><button onClick={()=>addCart(p)} style={{marginTop:5,padding:'5px 10px',background:'#2a5298',color:'#fff',border:'none',borderRadius:6}}>Add +</button></div>)}
      </div>
    </div>}

    {cart.length>0 && <div style={{position:'fixed',bottom:20,right:20,background:'#2a5298',color:'#fff',padding:'15px 20px',borderRadius:12}}>
      Total: ₹{finalTotal.toFixed(0)} {discount>0?`(Saved ₹${(total-finalTotal).toFixed(0)})`:''} ✓
    </div>}
  </div>);
}
