import {useCallback,useEffect,useMemo,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import axios from 'axios';
import ProductCard,{getDiscount} from '../../components/ProductCard.jsx';
import FlashSale from '../../components/FlashSale.jsx';
import {API} from '../../utils/api.js';

const CATEGORIES=[
  {label:'All',value:'all'},
  {label:'Mobile',value:'Mobile'},
  {label:'Audio & Power',value:'AudioPower'},
  {label:'Protection',value:'Protection'},
  {label:'Storage',value:'Storage'},
  {label:'Computing',value:'Computing'},
  {label:'Lifestyle',value:'Lifestyle'},
];
const PRICE_BUCKETS=[
  {label:'Any price',value:'all'},
  {label:'Under ₹1,000',value:'under-1000'},
  {label:'₹1,000–₹5,000',value:'1000-5000'},
  {label:'₹5,000–₹20,000',value:'5000-20000'},
  {label:'Above ₹20,000',value:'above-20000'},
];
const SORT_OPTIONS=[
  {label:'Popularity',value:'popularity'},
  {label:'Price: Low to High',value:'price-asc'},
  {label:'Price: High to Low',value:'price-desc'},
  {label:'Rating',value:'rating'},
  {label:'Discount',value:'discount'},
];

function ProductSkeleton(){
  return <div className="product-card-skeleton" aria-hidden="true"><div className="skeleton-media"/><div className="skeleton-line skeleton-brand"/><div className="skeleton-line"/><div className="skeleton-line skeleton-short"/><div className="skeleton-line skeleton-button"/></div>;
}

function matchesPrice(product,bucket){
  const price=Number(product.price)||0;
  if(bucket==='under-1000')return price<1000;
  if(bucket==='1000-5000')return price>=1000&&price<=5000;
  if(bucket==='5000-20000')return price>5000&&price<=20000;
  if(bucket==='above-20000')return price>20000;
  return true;
}

function sortedProducts(products,sort){
  const list=[...products];
  if(sort==='price-asc')return list.sort((a,b)=>Number(a.price)-Number(b.price));
  if(sort==='price-desc')return list.sort((a,b)=>Number(b.price)-Number(a.price));
  if(sort==='rating')return list.sort((a,b)=>Number(b.rating||0)-Number(a.rating||0));
  if(sort==='discount')return list.sort((a,b)=>getDiscount(b)-getDiscount(a));
  if(sort==='popularity')return list.sort((a,b)=>(Number(b.rating||0)*Math.log1p(Number(b.stock)||0))-(Number(a.rating||0)*Math.log1p(Number(a.stock)||0)));
  return list;
}

export default function Shop(){
  const location=useLocation();
  const [search,setSearch]=useState(()=>new URLSearchParams(location.search).get('search')||'');
  const [submittedSearch,setSubmittedSearch]=useState(()=>new URLSearchParams(location.search).get('search')||'');
  const [category,setCategory]=useState('all');
  const [priceBucket,setPriceBucket]=useState('all');
  const [sort,setSort]=useState('popularity');
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [retry,setRetry]=useState(0);

  useEffect(()=>{
    const value=new URLSearchParams(location.search).get('search')||'';
    setSearch(value);
    setSubmittedSearch(value);
  },[location.search]);

  const loadProducts=useCallback(async(signal)=>{
    setLoading(true);
    setError('');
    try{
      const response=await axios.get(`${API}/api/product/all`,{params:{limit:60,category:category==='all'?undefined:category,search:submittedSearch||undefined},signal});
      if(!signal.aborted)setProducts(response.data.products||[]);
    }catch{
      if(!signal.aborted)setError('We couldn’t load products right now. Check your connection and try again.');
    }finally{
      if(!signal.aborted)setLoading(false);
    }
  },[category,submittedSearch]);

  useEffect(()=>{
    const controller=new AbortController();
    loadProducts(controller.signal);
    return()=>controller.abort();
  },[loadProducts,retry]);

  const visibleProducts=useMemo(
    ()=>sortedProducts(products.filter(product=>matchesPrice(product,priceBucket)),sort),
    [products,priceBucket,sort],
  );

  const submitSearch=event=>{
    event.preventDefault();
    setSubmittedSearch(search.trim());
  };

  return <main className="shop-page">
    <FlashSale/>
    <section className="shop-catalog-shell" aria-labelledby="shop-heading">
      <div className="shop-heading-row">
        <div><p className="shop-eyebrow">DISCOVER YOUR NEXT FAVORITE</p><h1 id="shop-heading">Most Demanded</h1><p className="shop-subtitle">Quality picks for work, home and everyday life.</p></div>
        <span className="shop-product-count">{loading?'Loading…':`${visibleProducts.length} products`}</span>
      </div>

      <form className="shop-search" onSubmit={submitSearch}>
        <label className="shop-search-field"><span aria-hidden="true">⌕</span><input aria-label="Search products" placeholder="Search products, brands and more" value={search} onChange={event=>setSearch(event.target.value)}/></label>
        <button type="submit">Search</button>
      </form>

      <div className="shop-controls">
        <div className="shop-filter-group" aria-label="Filter by category">
          <span className="shop-filter-label">Category</span>
          <div className="shop-category-chips">{CATEGORIES.map(item=><button type="button" key={item.value} className={`shop-filter-chip${category===item.value?' is-active':''}`} aria-pressed={category===item.value} onClick={()=>setCategory(item.value)}>{item.label}</button>)}</div>
        </div>
        <div className="shop-secondary-filters">
          <label className="shop-select-label">Price
            <select value={priceBucket} onChange={event=>setPriceBucket(event.target.value)}>{PRICE_BUCKETS.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}</select>
          </label>
          <label className="shop-select-label">Sort by
            <select value={sort} onChange={event=>setSort(event.target.value)}>{SORT_OPTIONS.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}</select>
          </label>
        </div>
      </div>

      {loading?<div className="catalog-grid shop-product-grid" aria-label="Loading products">{Array.from({length:8},(_,index)=><ProductSkeleton key={index}/>)}</div>:
        error?<div className="shop-error-state" role="alert"><span className="shop-error-icon" aria-hidden="true">!</span><h2>Products didn’t load</h2><p>{error}</p><button type="button" onClick={()=>setRetry(value=>value+1)}>Retry</button></div>:
        visibleProducts.length===0?<div className="shop-empty-state"><span aria-hidden="true">⌕</span><h2>No products found</h2><p>Try another search or adjust your filters.</p><button type="button" onClick={()=>{setSearch('');setSubmittedSearch('');setCategory('all');setPriceBucket('all')}}>Clear filters</button></div>:
        <div className="catalog-grid shop-product-grid">{visibleProducts.map(product=><ProductCard key={product._id} product={product}/>)}</div>}

      {!loading&&!error&&<p className="shop-results-note">Showing {visibleProducts.length} of {products.length} matching products</p>}
      <Link to="/" className="shop-home-link">← Back to home</Link>
    </section>
  </main>;
}
