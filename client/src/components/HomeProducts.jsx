import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useStore} from '../context/StoreContext.jsx';
const API=(import.meta.env.VITE_API_URL||'https://enterprise-ai-powered-smartgadget.onrender.com').replace(/\/$/,'');
const PAGE_SIZE=50;
const MIN_PRODUCTS=150;
const MAX_PRODUCTS=300;
function fmt(n){return 'Rs.'+Number(n||0).toLocaleString('en-IN');}
function getPair(product,items){
  if(!product.comboTags?.length)return null;
  return items.filter(item=>item._id!==product._id&&item.comboTags?.some(tag=>product.comboTags.includes(tag)))
    .sort((a,b)=>b.comboTags.filter(tag=>product.comboTags.includes(tag)).length-a.comboTags.filter(tag=>product.comboTags.includes(tag)).length)[0]||null;
}
function PCard({product,items}){
  const nav=useNavigate();
  const {addCart,toggleWish,wish}=useStore();
  const pair=getPair(product,items);
  const saved=wish.some(item=>item._id===product._id);
  const image=product.image;
  const hasImage=image&&(image.startsWith('http')||image.startsWith('/'));
  const openProduct=()=>nav('/product/'+product._id);
  return(
    <article className="catalog-card">
      <button type="button" className="catalog-image" onClick={openProduct} aria-label={`View ${product.name}`}>
        {hasImage?<img src={image} alt={product.name}/>:<span aria-hidden="true">&#128230;</span>}
      </button>
      <div className="catalog-card-body">
        <span className="catalog-category">{product.category}</span>
        <button type="button" className="catalog-title" onClick={openProduct}>{product.name}</button>
        <div className="catalog-price">{fmt(product.price)}</div>
        <div className={product.stock>0?'catalog-stock':'catalog-stock catalog-out'}>{product.stock>0?`${product.stock} in stock`:'Out of stock'}</div>
        {pair&&<div className="catalog-pair"><span>Suggested pairing</span><small>{pair.name}</small><button type="button" disabled={!product.stock||!pair.stock} onClick={()=>{addCart(product);addCart(pair)}}>Add both · {fmt(Number(product.price)+Number(pair.price))}</button></div>}
        <div className="catalog-actions">
          <button type="button" disabled={!product.stock} onClick={()=>addCart(product)}>Add to cart</button>
          <button type="button" className={saved?'catalog-saved':''} aria-label={saved?'Remove from wishlist':'Add to wishlist'} onClick={()=>toggleWish(product)}>{saved?'Saved':'Wishlist'}</button>
        </div>
      </div>
    </article>
  );
}
async function fetchPage(page){
  const response=await fetch(`${API}/api/product/all?page=${page}&limit=${PAGE_SIZE}`);
  if(!response.ok)throw new Error('Product catalog could not be loaded');
  return response.json();
}
export default function HomeProducts(){
  const [items,setItems]=useState([]);
  const [total,setTotal]=useState(0);
  const [nextPage,setNextPage]=useState(4);
  const [loading,setLoading]=useState(true);
  const [loadingMore,setLoadingMore]=useState(false);
  const [seeding,setSeeding]=useState(false);
  const [error,setError]=useState('');
  const [auth]=useState(()=>{try{return JSON.parse(localStorage.getItem('ms_auth')||'null')}catch{return null}});
  useEffect(()=>{
    let active=true;
    Promise.all([1,2,3].map(fetchPage)).then(pages=>{
      if(!active)return;
      setItems(pages.flatMap(page=>page.products||[]).slice(0,MIN_PRODUCTS));
      setTotal(pages[0]?.total||0);
    }).catch(()=>{if(active)setError('Products could not be loaded. Please try again later.')})
      .finally(()=>{if(active)setLoading(false)});
    return()=>{active=false};
  },[]);
  const loadMore=async()=>{
    if(loadingMore||items.length>=MAX_PRODUCTS||items.length>=total)return;
    setLoadingMore(true);setError('');
    try{
      const page=await fetchPage(nextPage);
      setItems(current=>[...current,...(page.products||[])].slice(0,MAX_PRODUCTS));
      setTotal(page.total||total);setNextPage(current=>current+1);
    }catch{setError('More products could not be loaded. Please try again.')}
    finally{setLoadingMore(false)}
  };
  const seedCatalog=async()=>{
    setSeeding(true);setError('');
    try{
      const response=await fetch(`${API}/api/product/seed`,{method:'POST',headers:{Authorization:`Bearer ${auth.token}`}});
      const result=await response.json();
      if(!response.ok||!result.success)throw new Error(result.message||'Catalog setup failed');
      const pages=await Promise.all([1,2,3].map(fetchPage));
      setItems(pages.flatMap(page=>page.products||[]).slice(0,MIN_PRODUCTS));
      setTotal(pages[0]?.total||0);setNextPage(4);
    }catch(err){setError(err.message||'Catalog setup failed. Please try again.')}
    finally{setSeeding(false)}
  };
  if(loading)return <p className="catalog-state" role="status">Loading products...</p>;
  if(error&&!items.length)return <p className="catalog-state" role="alert">{error}</p>;
  if(!items.length)return <section className="catalog-section"><p className="catalog-state">No products are available yet.</p>{auth?.role==='Admin'&&auth?.token&&<button type="button" className="catalog-load-more" disabled={seeding} onClick={seedCatalog}>{seeding?'Preparing catalog...':'Populate starter catalog'}</button>}</section>;
  return(
    <section className="catalog-section" aria-labelledby="catalog-heading">
      <div className="catalog-heading-row"><div><h2 id="catalog-heading">Shop the catalog</h2><p>{items.length} of {Math.min(total,MAX_PRODUCTS)} products</p></div></div>
      <div className="catalog-grid">{items.map(product=><PCard key={product._id} product={product} items={items}/>)}</div>
      {error&&<p role="alert" className="catalog-state">{error}</p>}
      {total<MIN_PRODUCTS&&auth?.role==='Admin'&&auth?.token&&<button type="button" className="catalog-load-more" disabled={seeding} onClick={seedCatalog}>{seeding?'Preparing catalog...':'Populate starter catalog'}</button>}
      {items.length<Math.min(total,MAX_PRODUCTS)&&<button type="button" className="catalog-load-more" disabled={loadingMore} onClick={loadMore}>{loadingMore?'Loading...':'Load more products'}</button>}
    </section>
  );
}
