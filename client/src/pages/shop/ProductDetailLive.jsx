import {useEffect,useState} from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom';
import {useStore} from '../../context/StoreContext.jsx';
import PincodeEMI from '../../components/PincodeEMI.jsx';
import ProductGallery from '../../components/ProductGallery.jsx';
import {formatPrice,getDiscount,getListPrice,ProductImage} from '../../components/ProductCard.jsx';
const API=(import.meta.env.VITE_API_URL||'https://enterprise-ai-powered-smartgadget.onrender.com').replace(/\/$/,'');
export default function ProductDetailLive(){
  const {id}=useParams();const navigate=useNavigate();const {addCart,toggleWish,wish}=useStore();
  const [product,setProduct]=useState(null);const [matches,setMatches]=useState([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
  const [quantity,setQuantity]=useState(1);
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
  if(loading)return <main className="product-detail-shell"><div className="product-detail-skeleton" role="status">Loading product details…</div></main>;
  if(error||!product)return <main className="product-detail-shell"><p role="alert">{error||'Product not found'}</p><Link to="/shop">Back to shop</Link></main>;
  const saved=wish.some(item=>item._id===product._id);
  const discount=getDiscount(product);
  const addSelectedQuantity=()=>addCart(product,quantity);
  return(
    <main className="product-detail-shell">
      <Link to="/shop" className="product-back">Back to shop</Link>
      <section className="product-detail-grid">
        <div className="product-detail-image"><ProductGallery images={product.images||[]} highlights={product.highlights||[]} name={product.name} category={product.category}/><span className="product-discount-badge">-{discount}%</span><button type="button" className={`product-wishlist-button${saved?' is-saved':''}`} aria-label={saved?'Remove from wishlist':'Add to wishlist'} aria-pressed={saved} onClick={()=>toggleWish(product)}>{saved?'♥':'♡'}</button></div>
        <div className="product-detail-copy">
          <span className="catalog-category">{product.category}{product.subcategory?` / ${product.subcategory}`:''}</span>
          <h1>{product.name}</h1>
          <p className="product-brand">{product.brand||'MegaStore catalog'}</p>
          <div className="product-detail-rating"><span>★ {Number(product.rating||4.5).toFixed(1)}</span> Customer rating</div>
          <div className="product-detail-price-row"><p className="product-detail-price">{formatPrice(product.price)}</p><del>{formatPrice(getListPrice(product))}</del><span>{discount}% off</span></div>
          <p className={Number(product.stock)<10?'catalog-stock catalog-out':'catalog-stock'}>{product.stock>0?(product.stock<10?`Only ${product.stock} left!`:'In Stock'):'Out of stock'}</p>
          <dl className="product-spec-list"><div><dt>Brand</dt><dd>{product.brand||'MegaStore'}</dd></div><div><dt>Category</dt><dd>{product.subcategory||product.category}</dd></div><div><dt>Availability</dt><dd>{product.stock>0?'Ready to ship':'Currently unavailable'}</dd></div></dl>
          {product.comboTags?.length>0&&<div className="product-tags"><h2>Shop by compatibility</h2><div>{product.comboTags.map(tag=><span key={tag}>{tag}</span>)}</div></div>}
          <div className="product-quantity"><span>Quantity</span><div><button type="button" aria-label="Decrease quantity" disabled={quantity<=1} onClick={()=>setQuantity(value=>Math.max(1,value-1))}>−</button><output aria-live="polite">{quantity}</output><button type="button" aria-label="Increase quantity" disabled={quantity>=Number(product.stock)} onClick={()=>setQuantity(value=>Math.min(Number(product.stock),value+1))}>+</button></div></div>
          <div className="product-detail-actions">
            <button type="button" disabled={!product.stock} onClick={addSelectedQuantity}>Add to cart</button>
            <button type="button" disabled={!product.stock} onClick={()=>{addSelectedQuantity();navigate('/checkout')}}>Buy now</button>
            <button type="button" onClick={()=>toggleWish(product)}>{saved?'Remove from wishlist':'Add to wishlist'}</button>
          </div>
          <PincodeEMI price={product.price}/>
        </div>
      </section>
      {matches.length>0&&<section className="product-matches">
        <h2>Frequently bought together</h2>
        <div className="product-match-grid">{matches.map(match=><button type="button" className="product-match" key={match._id} onClick={()=>navigate(`/product/${match._id}`)}>
          <ProductImage product={match} className="product-match-image"/>
          <span>{match.name}</span><b>{formatPrice(match.price)}</b>
        </button>)}</div>
      </section>}
    </main>
  );
}
