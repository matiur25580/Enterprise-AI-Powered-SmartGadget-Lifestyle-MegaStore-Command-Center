import {useEffect,useState,Component} from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom';
import {useStore} from '../../context/StoreContext.jsx';
const API=(import.meta.env.VITE_API_URL||'https://enterprise-ai-powered-smartgadget.onrender.com').replace(/\/$/,'');
const inr=n=>'₹'+Number(n||0).toLocaleString('en-IN');
const discOf=p=>{ const m=Number(p&&p.mrp||0), pr=Number(p&&p.price||0); return (m>pr&&m>0)?Math.round((1-pr/m)*100):0; };
class Safe extends Component{
  constructor(p){ super(p); this.state={err:null}; }
  static getDerivedStateFromError(e){ return {err:e}; }
  render(){
    if(this.state.err){
      return (<div style={{padding:15,margin:10,background:'#ffebee',border:'1px solid #f44336',borderRadius:8,fontFamily:'sans-serif'}}>
        <b style={{color:'#c62828'}}>Component error (debug):</b>
        <pre style={{whiteSpace:'pre-wrap',wordBreak:'break-word',fontSize:12,color:'#333'}}>{String((this.state.err&&this.state.err.message)||this.state.err)}</pre>
      </div>);
    }
    return this.props.children;
  }
}
export default function ProductDetailLive(){
  return (<Safe><Inner/></Safe>);
}
function Inner(){
  const {id}=useParams();
  const navigate=useNavigate();
  let hookErr='';
  let store={};
  try{ store=useStore()||{}; }catch(e){ hookErr=String((e&&e.message)||e); store={}; }
  const addCart=store.addCart||(()=>{});
  const toggleWish=store.toggleWish||(()=>{});
  const wish=Array.isArray(store.wish)?store.wish:[];
  const [product,setProduct]=useState(null);
  const [matches,setMatches]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [quantity,setQuantity]=useState(1);
  useEffect(()=>{
    let active=true;
    (async()=>{
      setLoading(true); setError('');
      try{
        const r=await fetch(API+'/api/product/'+id);
        const d=await r.json().catch(()=>({}));
        if(!r.ok||!d.success) throw new Error((d&&d.message)||'Product not found');
        if(active) setProduct(d.product||null);
        try{
          const mr=await fetch(API+'/api/product/combo/'+id);
          const md=await mr.json().catch(()=>({}));
          if(active) setMatches(Array.isArray(md.matches)?md.matches:[]);
        }catch(e){ if(active) setMatches([]); }
      }catch(e){ if(active) setError(e.message||'Failed to load product'); }
      if(active) setLoading(false);
    })();
    return ()=>{active=false;};
  },[id]);
  if(loading) return (<div style={{padding:40,textAlign:'center',fontFamily:'sans-serif'}}>Loading product…</div>);
  if(error||!product) return (<div style={{padding:40,textAlign:'center',fontFamily:'sans-serif'}}><p>{error||'Product not found'}</p><Link to="/shop">← Back to shop</Link></div>);
  const d=discOf(product);
  const pid=product._id||product.id;
  const saved=wish.find(x=>x&&(x._id===pid||x.id===pid));
  return (
  <div style={{maxWidth:1100,margin:'0 auto',padding:15,fontFamily:'sans-serif'}}>
    {hookErr&&(<div style={{padding:10,background:'#fff3cd',border:'1px solid #ffc107',borderRadius:8,marginBottom:10,fontSize:12}}><b>Hook error:</b> {hookErr}</div>)}
    <Link to="/shop">← Back</Link>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginTop:10}}>
      <div style={{position:'relative'}}>
        <div style={{background:'#f0f0f0',borderRadius:12,padding:40,textAlign:'center',color:'#888'}}>[Gallery temporarily disabled for diagnosis]<br/>{product.name||''}</div>
        {d>0&&(<span style={{position:'absolute',top:10,left:10,background:'#388e3c',color:'#fff',padding:'4px 10px',borderRadius:12,fontSize:12,fontWeight:'bold',zIndex:2}}>-{d}%</span>)}
        <button onClick={()=>toggleWish(product)} aria-label="wishlist" style={{position:'absolute',top:10,right:10,width:40,height:40,borderRadius:'50%',border:'none',background:'rgba(255,255,255,.92)',fontSize:18,cursor:'pointer',zIndex:2}}>{saved?'♥':'♡'}</button>
      </div>
      <div>
        <h2 style={{margin:'0 0 8px'}}>{product.name||'Product'}</h2>
        <div><span style={{background:'#388e3c',color:'#fff',padding:'2px 8px',borderRadius:4,fontSize:13}}>{product.rating||'4.0'} ★</span></div>
        <div style={{margin:'10px 0'}}><b style={{fontSize:28}}>{inr(product.price)}</b>{(Number(product.mrp)>Number(product.price))&&(<span> <s style={{color:'#888'}}>{inr(product.mrp)}</s> <b style={{color:'#388e3c'}}>{d}% off</b></span>)}</div>
        {product.description&&(<p style={{color:'#555',fontSize:14}}>{product.description}</p>)}
        <div style={{display:'flex',gap:10,alignItems:'center',margin:'12px 0'}}>
          <span style={{fontSize:14}}>Qty:</span>
          <button onClick={()=>setQuantity(q=>Math.max(1,q-1))} style={{width:32,height:32,borderRadius:6,border:'1px solid #ddd',cursor:'pointer'}}>-</button>
          <b>{quantity}</b>
          <button onClick={()=>setQuantity(q=>Math.min(10,q+1))} style={{width:32,height:32,borderRadius:6,border:'1px solid #ddd',cursor:'pointer'}}>+</button>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>{for(let i=0;i<quantity;i++)addCart(product);}} style={{flex:1,padding:12,background:'#ff9f00',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold',cursor:'pointer'}}>🛒 ADD TO CART</button>
          <button onClick={()=>{for(let i=0;i<quantity;i++)addCart(product);navigate('/checkout');}} style={{flex:1,padding:12,background:'#fb641b',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold',cursor:'pointer'}}>⚡ BUY NOW</button>
        </div>
      </div>
    </div>
    {matches.length>0&&(
      <div style={{marginTop:30}}>
        <h3>Frequently bought together</h3>
        <div style={{display:'flex',gap:12,overflowX:'auto',paddingBottom:8}}>
          {matches.map((m,i)=>{ const mid=m&&(m._id||m.id||i); return (
            <Link key={mid} to={'/product/'+(m._id||m.id)} style={{minWidth:150,textDecoration:'none',color:'inherit',border:'1px solid #eee',borderRadius:10,padding:10}}>
              <div style={{fontSize:13,fontWeight:'bold',marginBottom:6}}>{(m&&m.name)||''}</div>
              <div style={{color:'#388e3c',fontWeight:'bold'}}>{inr(m&&m.price)}</div>
            </Link> );})}
        </div>
      </div>
    )}
  </div>);
}
