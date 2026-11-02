import {useEffect,useState} from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom';
import {useStore} from '../../context/StoreContext.jsx';
const API=(import.meta.env.VITE_API_URL||'https://enterprise-ai-powered-smartgadget.onrender.com').replace(/\/$/,'');
function price(value){return 'Rs.'+Number(value||0).toLocaleString('en-IN');}
function imageUrl(value){return value?.startsWith('http')?value:value?API+value:'';}
export default function ProductDetailLive(){
  const {id}=useParams();const navigate=useNavigate();const {addCart,toggleWish,wish}=useStore();
  const [product,setProduct]=useState(null);const [matches,setMatches]=useState([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
  useEffect(()=>{
    let active=true;
    async function load(){
      setLoading(true);setError('');
      try{
        const response=await fetch(`${API}/api/product/${id}`);
        const data=await response.json();
        if(!response.ok||!data.success)throw new Error(data.message||'Product could not be found');
        if(active)setProduct(data.product);
        const matchResponse=await fetch(`${API}/api/product/combo/${id}`);
        if(matchResponse.ok){const matchData=await matchResponse.json();if(active)setMatches(matchData.perfect||[])}
      }catch(err){if(active)setError(err.message||'Product could not be loaded')}
      finally{if(active)setLoading(false)}
    }
    load();return()=>{active=false};
  },[id]);
  if(loading)return <p className="product-detail-state" role="status">Loading product...</p>;
  if(error||!product)return <main className="product-detail-shell"><p role="alert">{error||'Product not found'}</p><Link to="/shop">Back to shop</Link></main>;
  const saved=wish.some(item=>item._id===product._id);
  return(
    <main className="product-detail-shell">
      <Link to="/shop" className="product-back">Back to shop</Link>
      <section className="product-detail-grid">
        <div className="product-detail-image">{product.image?<img src={imageUrl(product.image)} alt={product.name}/>:<span aria-hidden="true">&#128230;</span>}</div>
        <div className="product-detail-copy">
          <span className="catalog-category">{product.category}{product.subcategory?` / ${product.subcategory}`:''}</span>
          <h1>{product.name}</h1>
          <p className="product-brand">{product.brand||'MegaStore catalog'}</p>
          <p className="product-detail-price">{price(product.price)}</p>
          <p className={product.stock>0?'catalog-stock':'catalog-stock catalog-out'}>{product.stock>0?`${product.stock} in stock`:'Out of stock'}</p>
          <div className="product-detail-actions">
            <button type="button" disabled={!product.stock} onClick={()=>addCart(product)}>Add to cart</button>
            <button type="button" disabled={!product.stock} onClick={()=>{addCart(product);navigate('/checkout')}}>Buy now</button>
            <button type="button" onClick={()=>toggleWish(product)}>{saved?'Remove from wishlist':'Add to wishlist'}</button>
          </div>
        </div>
      </section>
      {matches.length>0&&<section className="product-matches">
        <h2>Smart matches</h2>
        <div className="product-match-grid">{matches.map(match=><button type="button" className="product-match" key={match._id} onClick={()=>navigate(`/product/${match._id}`)}>
          {match.image?<img src={imageUrl(match.image)} alt=""/>:<span aria-hidden="true">&#128230;</span>}
          <span>{match.name}</span><b>{price(match.price)}</b>
        </button>)}</div>
      </section>}
    </main>
  );
}
