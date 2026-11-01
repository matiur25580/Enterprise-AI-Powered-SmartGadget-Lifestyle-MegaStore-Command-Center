import {useState} from 'react';
export default function Shop(){
  const demo=[
    {name:'iPhone 15',price:79900,cat:'Mobile'},{name:'Earbuds Pro',price:2499,cat:'Audio'},
    {name:'Laptop HP 15s',price:55990,cat:'Computing'},{name:'Sunglasses',price:1999,cat:'Lifestyle'},
    {name:'Pendrive 128GB',price:1299,cat:'Storage'},{name:'Mobile Cover',price:999,cat:'Protection'},
  ];
  const [cart,setCart]=useState([]);const [wish,setWish]=useState([]);
  return (<div style={{padding:20,fontFamily:'sans-serif'}}>
    <h2>🛒 MegaStore Shop ✓</h2>
    <p>Cart: {cart.length} | Wishlist: {wish.length}</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
      {demo.map((p,i)=><div key={i} style={{border:'1px solid #ddd',padding:15,borderRadius:10}}>
        <h4>{p.name}</h4><small>{p.cat}</small><h3>₹{p.price}</h3>
        <button onClick={()=>{setCart([...cart,p]);alert('Added to cart successfully')}} style={{width:'100%',padding:8,background:'#00c853',color:'#fff',border:'none',borderRadius:6}}>Add to Cart</button>
        <button onClick={()=>{setWish([...wish,p]);alert('Added to wishlist successfully')}} style={{width:'100%',marginTop:6,padding:8,background:'#eee',border:'none',borderRadius:6}}>❤️ Wishlist</button>
      </div>)}
    </div>
    <div style={{marginTop:20,background:'#e8f5e9',padding:15,borderRadius:10}}>
      <h3>🤖 AI Perfect Combo</h3><p>iPhone 15 + Cover + Adapter + Earbuds = Perfect Match ✓</p>
    </div>
  </div>);
}
