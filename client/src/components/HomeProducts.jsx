import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
const API=(import.meta.env.VITE_API_URL||'https://enterprise-ai-powered-smartgadget.onrender.com').replace(/\/$/,'');
const DETAIL='/product';
function disc(p){if(!p.mrp||p.mrp<=p.price)return 0;return Math.round((p.mrp-p.price)/p.mrp*100);}
function fmt(n){return 'Rs.'+Number(n||0).toLocaleString('en-IN');}
const cardSt={minWidth:150,width:150,background:'#212122',border:'1px solid #353839',borderRadius:10,overflow:'hidden',cursor:'pointer',flexShrink:0};
function PCard({p}){
  const nav=useNavigate();
  const d=disc(p);
  const img=p.images&&p.images[0];
  const ok=img&&(img.indexOf('http')===0||img.indexOf('/')===0);
  return(
    <div style={cardSt} onClick={()=>nav(DETAIL+'/'+p._id)}>
      <div style={{height:120,background:'#060606',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
        {ok?<img src={img} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:<span style={{fontSize:40}}>&#128230;</span>}
      </div>
      <div style={{padding:8}}>
        <div style={{fontSize:12,color:'#e6edf3',height:32,overflow:'hidden'}}>{p.title}</div>
        <div style={{display:'flex',alignItems:'center',gap:6,marginTop:4}}>
          {p.rating?<span style={{background:'#238636',color:'#fff',fontSize:11,padding:'1px 6px',borderRadius:4}}>{p.rating} &#9733;</span>:null}
          {d>0?<span style={{color:'#3fb950',fontSize:11}}>{d}% off</span>:null}
        </div>
        <div style={{marginTop:4}}>
          <b style={{color:'#e6edf3',fontSize:14}}>{fmt(p.price)}</b>
          {p.mrp>p.price?<span style={{color:'#8b949e',fontSize:11,marginLeft:6}}><s>{fmt(p.mrp)}</s></span>:null}
        </div>
      </div>
    </div>
  );
}
function Section({title,items}){
  if(!items||!items.length)return null;
  return(
    <div style={{marginTop:18,padding:'0 12px'}}>
      <b style={{color:'#e6edf3',fontSize:16}}>{title}</b>
      <div style={{display:'flex',gap:10,overflowX:'auto',paddingBottom:6,marginTop:8}}>
        {items.map(p=><PCard key={p._id} p={p}/>)}
      </div>
    </div>
  );
}
export default function HomeProducts(){
  const [items,setItems]=useState([]);
  useEffect(()=>{
    fetch(API+'/api/products/all?limit=60').then(r=>r.json()).then(d=>{
      const a=d.products||d.data||d;
      setItems(Array.isArray(a)?a:[]);
    }).catch(()=>{});
  },[]);
  if(!items.length)return null;
  const deals=[...items].sort((a,b)=>disc(b)-disc(a)).slice(0,10);
  const fresh=[...items].reverse().slice(0,10);
  return(
    <div style={{paddingBottom:24}}>
      <Section title="Suggested For You" items={items.slice(0,10)}/>
      <Section title="Top Discounts" items={deals}/>
      <Section title="New Arrivals" items={fresh}/>
    </div>
  );
}
