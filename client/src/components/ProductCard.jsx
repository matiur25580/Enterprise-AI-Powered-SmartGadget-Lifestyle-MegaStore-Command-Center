import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useStore} from '../context/StoreContext.jsx';

const API=(import.meta.env.VITE_API_URL||'https://enterprise-ai-powered-smartgadget.onrender.com').replace(/\/$/,'');
const CATEGORY_META={
  Mobile:{icon:'📱',className:'mobile'},
  AudioPower:{icon:'🎧',className:'audio'},
  Protection:{icon:'🛡️',className:'protection'},
  Storage:{icon:'💾',className:'storage'},
  Computing:{icon:'💻',className:'computing'},
  Lifestyle:{icon:'⌚',className:'lifestyle'},
};

function hash(value=''){
  return [...String(value)].reduce((result,character)=>(result*31+character.charCodeAt(0))>>>0,7);
}

export function getDiscount(product){
  const price=Number(product.price)||0;
  const mrp=Number(product.mrp);
  if(mrp>price&&price>0)return Math.round((mrp-price)/mrp*100);
  return [10,25,40][hash(product._id)%3];
}

export function getListPrice(product){
  const price=Number(product.price)||0;
  return Number(product.mrp)>price?Number(product.mrp):Math.round(price/(1-getDiscount(product)/100));
}

export function formatPrice(value){
  return `₹${Number(value||0).toLocaleString('en-IN')}`;
}

export function ProductImage({product,className='product-media-image',large=false}){
  const [failed,setFailed]=useState(false);
  const image=product.image||(Array.isArray(product.images)?product.images[0]:'');
  const source=image?.startsWith('http')?image:image?.startsWith('/')?`${API}${image}`:'';
  const category=CATEGORY_META[product.category]||{icon:'📦',className:'default'};
  if(source&&!failed)return <img className={className} src={source} alt={product.name||'Product'} onError={()=>setFailed(true)}/>;
  return <div className={`product-placeholder product-placeholder-${category.className}${large?' product-placeholder-large':''}`} role="img" aria-label={`${product.category||'Product'} image placeholder`}>
    <span aria-hidden="true">{category.icon}</span>
  </div>;
}

export default function ProductCard({product,onView}){
  const navigate=useNavigate();
  const {addCart,toggleWish,wish}=useStore();
  const saved=wish.some(item=>item._id===product._id);
  const discount=getDiscount(product);
  const rating=Number(product.rating)||4.5;
  const ratingCount=100+(hash(product._id)%1900);
  const stock=Number(product.stock)||0;
  const open=()=>{
    onView?.(product);
    navigate(`/product/${product._id}`);
  };
  const onCardKeyDown=event=>{
    if(event.target!==event.currentTarget)return;
    if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}
  };
  return <article className="product-card" role="link" tabIndex={0} aria-label={`View ${product.name}`} onClick={open} onKeyDown={onCardKeyDown}>
    <div className="product-card-media">
      <ProductImage product={product}/>
      <span className="product-discount-badge">-{discount}%</span>
      <button type="button" className={`product-wishlist-button${saved?' is-saved':''}`} aria-label={saved?`Remove ${product.name} from wishlist`:`Add ${product.name} to wishlist`} aria-pressed={saved} onClick={event=>{event.stopPropagation();toggleWish(product)}}>{saved?'♥':'♡'}</button>
    </div>
    <div className="product-card-body">
      <span className="product-card-brand">{product.brand||'MegaStore'}</span>
      <h3 className="product-card-title">{product.name}</h3>
      <div className="product-card-rating"><span>★ {rating.toFixed(1)}</span><small>({ratingCount.toLocaleString('en-IN')})</small></div>
      <div className="product-card-price-row">
        <strong>{formatPrice(product.price)}</strong>
        <del>{formatPrice(getListPrice(product))}</del>
        <span>{discount}% off</span>
      </div>
      <p className={`product-card-stock${stock<10?' product-card-stock-low':''}`}>{stock<10?(stock>0?`Only ${stock} left!`:'Out of stock'):'In Stock'}</p>
      <div className="product-card-actions">
        <button type="button" className="product-add-button" disabled={!stock} onClick={event=>{event.stopPropagation();addCart(product)}}>Add to Cart</button>
        <button type="button" className="product-buy-button" disabled={!stock} onClick={event=>{event.stopPropagation();addCart(product);navigate('/checkout')}}>Buy Now</button>
      </div>
    </div>
  </article>;
}
