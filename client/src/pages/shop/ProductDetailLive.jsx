import {useEffect,useState,Component} from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom';
import {useStore} from '../../context/StoreContext.jsx';
import PincodeEMI from '../../components/PincodeEMI.jsx';
import ProductGallery from '../../components/ProductGallery.jsx';
import {API} from '../../utils/api.js';

const inr=n=>'₹'+Number(n||0).toLocaleString('en-IN');
const discOf=p=>{ const m=Number(p&&p.mrp||0), pr=Number(p&&p.price||0); return (m>pr&&m>0)?Math.round((1-pr/m)*100):0; };
const normalizeSpecs=obj=>Object.entries(obj||{}).filter(([,value])=>value!==undefined&&value!==null&&value!=='').map(([key,value])=>({label:key,value:String(value)}));
const normalizeBullets=(value,highlights)=>{ if(Array.isArray(value)&&value.length) return value; if(Array.isArray(highlights)&&highlights.length) return highlights.map(h=>[h.title,h.subtitle].filter(Boolean).join(' — ')); return []; };

class Safe extends Component{
  constructor(p){ super(p); this.state={bad:false}; }
  static getDerivedStateFromError(){ return {bad:true}; }
  render(){ return this.state.bad?null:this.props.children; }
}

export default function ProductDetailLive(){
  const {id}=useParams();
  const navigate=useNavigate();
  const store=useStore()||{};
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
  const specs=normalizeSpecs(product.specs);
  const featureList=normalizeBullets(product.featureBullets,product.highlights);
  const description=product.description||((Array.isArray(product.highlights)&&product.highlights.length)?product.highlights.map(h=>h.subtitle||h.title).filter(Boolean).join(' • '):'High-quality gadget built for everyday convenience and performance.');

  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:16,fontFamily:'sans-serif',color:'#1f2937'}}>
      <div style={{marginBottom:12}}><Link to="/shop" style={{color:'#1d4ed8',textDecoration:'none'}}>← Back to shop</Link></div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,420px),1fr))',gap:24,alignItems:'start'}}>
        <div style={{position:'relative'}}>
          <Safe><ProductGallery images={product.images||[]} highlights={product.highlights||[]} name={product.name||''} category={product.category||''}/></Safe>
          {d>0&&(<span style={{position:'absolute',top:12,left:12,background:'#388e3c',color:'#fff',padding:'4px 10px',borderRadius:12,fontSize:12,fontWeight:'bold',zIndex:2}}>-{d}%</span>)}
          <button onClick={()=>toggleWish(product)} aria-label="wishlist" style={{position:'absolute',top:12,right:12,width:40,height:40,borderRadius:'50%',border:'none',background:'rgba(255,255,255,.92)',fontSize:18,cursor:'pointer',zIndex:2}}>{saved?'♥':'♡'}</button>
        </div>

        <div style={{background:'#fff',border:'1px solid #eef2f7',borderRadius:18,padding:20,boxShadow:'0 8px 24px rgba(15,23,42,0.06)'}}>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
            <span style={{background:'#eef2ff',color:'#4338ca',padding:'5px 10px',borderRadius:999,fontWeight:700,fontSize:12}}>{product.category||'Product'}</span>
            <span style={{background:'#ecfdf5',color:'#047857',padding:'5px 10px',borderRadius:999,fontWeight:700,fontSize:12}}>{product.stock>0?'In stock':'Out of stock'}</span>
          </div>

          <h1 style={{margin:'0 0 10px',fontSize:'clamp(1.8rem,2vw,2.6rem)',lineHeight:1.2}}>{product.name||'Product'}</h1>

          <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:12}}>
            <span style={{background:'#388e3c',color:'#fff',padding:'4px 8px',borderRadius:6,fontSize:13,fontWeight:700}}>{Number(product.rating||4.5).toFixed(1)} ★</span>
            <span style={{color:'#64748b',fontSize:13}}>{product.monthlySales||0} sold this month</span>
          </div>

          <div style={{marginBottom:12}}>
            <b style={{fontSize:32,letterSpacing:'-0.03em'}}>{inr(product.price)}</b>
            {(Number(product.mrp)>Number(product.price))&&(
              <span style={{marginLeft:10}}>
                <s style={{color:'#94a3b8'}}>{inr(product.mrp)}</s>
                <b style={{color:'#388e3c',marginLeft:8}}>{d}% off</b>
              </span>
            )}
          </div>

          <p style={{margin:'0 0 18px',color:'#475569',fontSize:15,lineHeight:1.6}}>{description}</p>

          <Safe><PincodeEMI price={product.price}/></Safe>

          <div style={{display:'flex',gap:10,alignItems:'center',margin:'18px 0 14px'}}>
            <span style={{fontSize:14,color:'#475569',fontWeight:600}}>Qty:</span>
            <button onClick={()=>setQuantity(q=>Math.max(1,q-1))} style={{width:34,height:34,borderRadius:8,border:'1px solid #dbe3ef',cursor:'pointer',background:'#fff'}}>-</button>
            <b style={{minWidth:24,textAlign:'center'}}>{quantity}</b>
            <button onClick={()=>setQuantity(q=>Math.min(10,q+1))} style={{width:34,height:34,borderRadius:8,border:'1px solid #dbe3ef',cursor:'pointer',background:'#fff'}}>+</button>
          </div>

          <div style={{display:'flex',gap:12,marginBottom:14}}>
            <button onClick={()=>{for(let i=0;i<quantity;i++)addCart(product);}} style={{flex:1,padding:'14px 12px',background:'#ff9f00',color:'#fff',border:'none',borderRadius:10,fontWeight:800,cursor:'pointer'}}>🛒 Add to cart</button>
            <button onClick={()=>{for(let i=0;i<quantity;i++)addCart(product);navigate('/checkout');}} style={{flex:1,padding:'14px 12px',background:'#fb641b',color:'#fff',border:'none',borderRadius:10,fontWeight:800,cursor:'pointer'}}>⚡ Buy now</button>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))',gap:10}}>
            {[
              ['🚚', 'Free delivery', 'Tomorrow'],
              ['✅', '7-day', 'Replacement'],
              ['💳', 'COD', 'Available'],
            ].map(([icon, title, detail]) => (
              <div key={title} style={{background:'#f8fafc',border:'1px solid #eef2f7',borderRadius:12,padding:12,textAlign:'center'}}>
                <div style={{fontSize:20}}>{icon}</div>
                <div style={{fontSize:12,color:'#475569',marginTop:6}}>{title}</div>
                <div style={{fontSize:11,color:'#1f2937',fontWeight:700,marginTop:2}}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,360px),1fr))',gap:24,marginTop:28}}>
        <section style={{background:'#fff',border:'1px solid #eef2f7',borderRadius:18,padding:20,boxShadow:'0 8px 24px rgba(15,23,42,0.05)'}}>
          <h3 style={{margin:'0 0 16px',fontSize:24}}>Highlights</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:12}}>
            {featureList.slice(0,8).map((item,index)=>(
              <div key={index} style={{display:'flex',gap:10,alignItems:'flex-start',background:'#f8fafc',border:'1px solid #eef2f7',padding:12,borderRadius:12}}>
                <span style={{fontSize:18}}>{['✨','⚡','📦','🎯','🔋','📷','🛡️','💡'][index % 8]}</span>
                <div>
                  <div style={{fontWeight:700,color:'#0f172a'}}>{typeof item === 'string' ? item.split(' — ')[0] : item.title}</div>
                  <div style={{fontSize:13,color:'#64748b',marginTop:4}}>{typeof item === 'string' ? item.split(' — ').slice(1).join(' — ') || 'Built for everyday convenience.' : item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{background:'#fff',border:'1px solid #eef2f7',borderRadius:18,padding:20,boxShadow:'0 8px 24px rgba(15,23,42,0.05)'}}>
          <h3 style={{margin:'0 0 16px',fontSize:24}}>Specifications</h3>
          <div style={{overflow:'hidden',borderRadius:12,border:'1px solid #edf2f7'}}>
            {specs.length ? (
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:14}}>
                <tbody>
                  {specs.map(({label,value}) => (
                    <tr key={label} style={{borderTop:'1px solid #edf2f7'}}>
                      <td style={{padding:'10px 12px',background:'#f8fafc',fontWeight:700,color:'#334155',width:'38%'}}>{label}</td>
                      <td style={{padding:'10px 12px',color:'#475569'}}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{padding:20,color:'#64748b'}}>Detailed specifications will be added soon for this product.</div>
            )}
          </div>
        </section>
      </div>

      <section style={{marginTop:28,background:'#111827',color:'#e5e7eb',borderRadius:18,padding:20}}>
        <h3 style={{margin:'0 0 12px',fontSize:24}}>Why shoppers choose this</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:14}}>
          {[
            ['Premium design', 'Crafted to feel premium in hand and look sharp in everyday use.'],
            ['Reliable performance', 'Fast, efficient, and built to handle daily tasks without friction.'],
            ['Easy support', 'Backed by easy returns, flexible payments, and quick delivery.'],
          ].map(([title, copy]) => (
            <div key={title} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:12,padding:16}}>
              <div style={{fontWeight:800,fontSize:18,marginBottom:6}}>{title}</div>
              <div style={{fontSize:14,color:'#cbd5e1'}}>{copy}</div>
            </div>
          ))}
        </div>
      </section>

      {matches.length>0&&(
        <div style={{marginTop:30}}>
          <h3 style={{marginBottom:12}}>Frequently bought together</h3>
          <div style={{display:'flex',gap:12,overflowX:'auto',paddingBottom:8}}>
            {matches.map((m,i)=>{ const mid=m&&(m._id||m.id||i); return (
              <Link key={mid} to={'/product/'+(m._id||m.id)} style={{minWidth:180,textDecoration:'none',color:'inherit',border:'1px solid #eee',borderRadius:12,padding:12,background:'#fff'}}>
                <div style={{fontSize:13,fontWeight:'bold',marginBottom:8}}>{(m&&m.name)||''}</div>
                <div style={{color:'#388e3c',fontWeight:'bold'}}>{inr(m&&m.price)}</div>
              </Link>
            );})}
          </div>
        </div>
      )}
    </div>
  );
}
