import {Link} from 'react-router-dom';import {useStore} from '../../context/StoreContext.jsx';
export default function Wishlist(){
  const {wish,toggleWish,addCart}=useStore();
  return (<div style={{padding:20,maxWidth:1000,margin:'0 auto',fontFamily:'sans-serif'}}>
    <Link to="/shop">← Shop</Link><h2>❤️ My Wishlist ({wish.length})</h2>
    {wish.length===0?<p style={{textAlign:'center',padding:40}}>Wishlist empty. <Link to="/shop">Shop now</Link></p>:
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
      {wish.map(p=><div key={p._id} style={{border:'1px solid #eee',borderRadius:10,padding:12}}>
        <h4>{p.name}</h4><p style={{color:'#2a5298',fontWeight:'bold'}}>₹{p.price?.toLocaleString('en-IN')}</p>
        <div style={{display:'flex',gap:6}}><button onClick={()=>addCart(p)} style={{flex:1,padding:8,background:'#00c853',color:'#fff',border:'none',borderRadius:6}}>Add to Cart ✓</button>
        <button onClick={()=>{toggleWish(p);alert('✓ Removed from wishlist')}} style={{padding:8,background:'#ffebee',border:'none',borderRadius:6}}>🗑️</button></div>
      </div>)}
    </div>}
  </div>);
}
