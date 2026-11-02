import {Link} from 'react-router-dom';import {useStore} from '../../context/StoreContext.jsx';
export default function Wishlist(){
  const {wish,toggleWish,moveToCart}=useStore();
  return (<div style={{padding:20,maxWidth:1000,margin:'0 auto',fontFamily:'sans-serif'}}>
    <Link to="/shop">← Shop</Link><h2>❤️ My Wishlist ({wish.length})</h2>
    {wish.length===0?<p style={{textAlign:'center',padding:40}}>Wishlist empty. <Link to="/shop">Shop now</Link></p>:
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
      {wish.map(p=><div key={p._id} style={{border:'1px solid #eee',borderRadius:10,padding:12}}>
        <h4>{p.name}</h4><p style={{color:'#2a5298',fontWeight:'bold'}}>₹{p.price?.toLocaleString('en-IN')}</p>
        <div style={{display:'flex',gap:6}}><button onClick={()=>moveToCart(p)} style={{flex:1,padding:8,background:'#00c853',color:'#fff',border:'none',borderRadius:6}}>Move to cart</button>
        <button aria-label={`Remove ${p.name} from wishlist`} title="Remove from wishlist" onClick={()=>toggleWish(p)} style={{padding:'8px 12px',background:'#ffebee',border:'none',borderRadius:6}}>Remove</button></div>
      </div>)}
    </div>}
  </div>);
}
