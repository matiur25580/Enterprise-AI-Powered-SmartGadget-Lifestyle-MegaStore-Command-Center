import {useCallback,useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import ProductCard,{getDiscount} from './ProductCard.jsx';
import {API} from '../utils/api.js';

function ProductSkeleton(){
  return <div className="product-card-skeleton" aria-hidden="true"><div className="skeleton-media"/><div className="skeleton-line skeleton-brand"/><div className="skeleton-line"/><div className="skeleton-line skeleton-short"/><div className="skeleton-line skeleton-button"/></div>;
}

function Section({title,items,viewAll=false}){
  if(!items.length)return null;
  return <section className="home-product-section">
    <div className="home-product-heading"><div><p className="shop-eyebrow">CURATED FOR YOU</p><h2>{title}</h2></div>{viewAll&&<Link to="/shop">View All <span aria-hidden="true">→</span></Link>}</div>
    <div className="home-product-row">{items.map(product=><ProductCard key={product._id} product={product}/>)}</div>
  </section>;
}

export default function HomeProducts(){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [retry,setRetry]=useState(0);
  const load=useCallback(async(signal)=>{
    setLoading(true);
    setError('');
    try{
      const response=await fetch(`${API}/api/product/all?limit=60`,{signal});
      if(!response.ok)throw new Error(`Product request failed (${response.status})`);
      const result=await response.json();
      if(!result.success||!Array.isArray(result.products))throw new Error('Product response was invalid');
      setItems(result.products);
    }catch(err){
      if(err.name!=='AbortError')setError('We couldn’t load products right now. Please try again.');
    }finally{
      if(!signal.aborted)setLoading(false);
    }
  },[]);
  useEffect(()=>{
    const controller=new AbortController();
    load(controller.signal);
    return()=>controller.abort();
  },[load,retry]);

  if(loading)return <section className="home-product-section" aria-label="Loading popular products"><div className="home-product-heading"><div><p className="shop-eyebrow">CURATED FOR YOU</p><h2>Most Demanded</h2></div></div><div className="home-product-row">{Array.from({length:5},(_,index)=><ProductSkeleton key={index}/>)}</div></section>;
  if(error)return <section className="home-product-error" role="alert"><div><p className="shop-eyebrow">CURATED FOR YOU</p><h2>Most Demanded</h2><p>{error}</p></div><button type="button" onClick={()=>setRetry(value=>value+1)}>Retry</button></section>;
  if(!items.length)return null;

  const deals=[...items].sort((a,b)=>getDiscount(b)-getDiscount(a)).slice(0,10);
  const fresh=[...items].reverse().slice(0,10);
  return <div className="home-product-list">
    <Section title="Most Demanded" items={items.slice(0,10)} viewAll/>
    <Section title="Top Discounts" items={deals}/>
    <Section title="New Arrivals" items={fresh}/>
  </div>;
}
