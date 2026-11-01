import {useState} from 'react';import {useParams,Link} from 'react-router-dom';import {useStore} from '../../context/StoreContext.jsx';
import Product3D from '../../components/Product3D.jsx';
import Compare from '../../components/Compare.jsx';
import PriceAlert from '../../components/PriceAlert.jsx';
import ReviewQA from '../../components/ReviewQA.jsx';import DeliveryTrack from '../../components/DeliveryTrack.jsx';
// 6 alada design er product slides - prottekta product related
const SLIDES=[
 {bg:'linear-gradient(135deg,#0f2027,#203a43,#2c5364)',icon:'📱',title:'iPhone 15 - Front View',desc:'6.1" Super Retina XDR display, Dynamic Island',tag:'DISPLAY'},
 {bg:'linear-gradient(135deg,#41295a,#2F0743)',icon:'📸',title:'48MP Pro Camera',desc:'Night mode, 4K Cinematic video, 2x Telephoto',tag:'CAMERA'},
 {bg:'linear-gradient(135deg,#134e5e,#71b280)',icon:'⚡',title:'A16 Bionic Chip',desc:'6-core CPU, 5-core GPU - fastest ever',tag:'PERFORMANCE'},
 {bg:'linear-gradient(135deg,#8e2de2,#4a00e0)',icon:'🔋',title:'All-day Battery',desc:'20hrs video playback, MagSafe fast charging',tag:'BATTERY'},
 {bg:'linear-gradient(135deg,#f12711,#f5af19)',icon:'🛡️',title:'Ceramic Shield',desc:'Aerospace-grade aluminium, IP68 waterproof',tag:'BUILD'},
 {bg:'linear-gradient(135deg,#11998e,#38ef7d)',icon:'📦',title:'What is in the Box',desc:'iPhone 15, USB-C cable, SIM ejector, manual',tag:'BOX'},
];
export default function ProductDetail(){
  const {id}=useParams();const {addCart,toggleWish,wish}=useStore();
  const [idx,setIdx]=useState(0);const [full,setFull]=useState(false);
  const [color,setColor]=useState('Black');const [size,setSize]=useState('128 GB');
  const price=66999,mrp=79900,off=Math.round((1-price/mrp)*100);
  const p={_id:id||'1',name:'iPhone 15',price};const isW=wish.find(x=>x._id===p._id);
  const s=SLIDES[idx];
  return (<div style={{maxWidth:1100,margin:'0 auto',padding:15,fontFamily:'sans-serif'}}>
    <Link to="/shop">← Back</Link>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginTop:10}}>
      <div>
        {/* Main image - click = fullscreen */}
        <div onClick={()=>setFull(true)} style={{background:s.bg,borderRadius:12,padding:'50px 20px',textAlign:'center',color:'#fff',cursor:'zoom-in',position:'relative',minHeight:280}}>
          <span style={{position:'absolute',top:10,left:10,background:'rgba(255,255,255,.2)',padding:'4px 10px',borderRadius:12,fontSize:11}}>{s.tag}</span>
          <div style={{fontSize:90}}>{s.icon}</div>
          <h3 style={{margin:'10px 0 4px'}}>{s.title}</h3>
          <p style={{fontSize:13,opacity:.85,margin:0}}>{s.desc}</p>
          <small style={{opacity:.6}}>🔍 Click to expand fullscreen</small>
          <button onClick={(e)=>{e.stopPropagation();setIdx((idx+5)%6)}} style={{position:'absolute',left:8,top:'45%',width:36,height:36,borderRadius:'50%',border:'none'}}>‹</button>
          <button onClick={(e)=>{e.stopPropagation();setIdx((idx+1)%6)}} style={{position:'absolute',right:8,top:'45%',width:36,height:36,borderRadius:'50%',border:'none'}}>›</button>
        </div>
        {/* Thumbnails - 6 alada design */}
        <div style={{display:'flex',gap:8,overflowX:'auto',marginTop:8}}>
          {SLIDES.map((sl,i)=><div key={i} onClick={()=>setIdx(i)} style={{minWidth:80,height:70,background:sl.bg,borderRadius:8,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#fff',cursor:'pointer',border:i===idx?'3px solid #2a5298':'3px solid transparent'}}>
            <div style={{fontSize:24}}>{sl.icon}</div><small style={{fontSize:9}}>{sl.tag}</small>
          </div>)}
        </div>
        <div style={{display:'flex',gap:8,marginTop:10}}>
          <button onClick={()=>addCart(p)} style={{flex:1,padding:12,background:'#ff9f00',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>🛒 ADD TO CART</button>
          <button onClick={()=>alert('✓ Buy Now - order placed')} style={{flex:1,padding:12,background:'#fb641b',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>⚡ BUY NOW</button>
        </div>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button onClick={()=>{toggleWish(p);alert(isW?'✓ Removed':'✓ Wishlist e add holo')}} style={{flex:1,padding:8,border:'1px solid #ddd',borderRadius:8,background:isW?'#ffebee':'#fff'}}>{isW?'❤️':'🤍'} WISHLIST</button>
          <button onClick={()=>{navigator.clipboard?.writeText(location.href);alert('✓ Link copied')}} style={{flex:1,padding:8,border:'1px solid #ddd',borderRadius:8}}>🔗 SHARE</button>
        </div>
      </div>
      <div>
        <h2>iPhone 15 (128 GB) - {color}</h2>
        <div><span style={{background:'#388e3c',color:'#fff',padding:'2px 8px',borderRadius:4}}>4.6 ★</span> <small>2,341 ratings & 342 reviews</small></div>
        <div style={{margin:'10px 0'}}><b style={{fontSize:28}}>₹{price.toLocaleString('en-IN')}</b> <s style={{color:'#888'}}>₹{mrp.toLocaleString('en-IN')}</s> <b style={{color:'#388e3c'}}>{off}% off</b></div>
        <div><b>Color:</b> {['Black','Blue','Pink','Green'].map(c=><button key={c} onClick={()=>setColor(c)} style={{margin:4,padding:'6px 12px',borderRadius:6,border:color===c?'2px solid #2a5298':'1px solid #ddd',background:color===c?'#e3f2fd':'#fff'}}>{c}</button>)}</div>
        <div><b>Size:</b> {['128 GB','256 GB','512 GB'].map(z=><button key={z} onClick={()=>setSize(z)} style={{margin:4,padding:'6px 12px',borderRadius:6,border:size===z?'2px solid #2a5298':'1px solid #ddd'}}>{z}</button>)}</div>
        <h4>✨ Highlights</h4><ul style={{fontSize:14}}><li>✓ 6.1" Super Retina XDR, Dynamic Island</li><li>✓ A16 Bionic, 48MP camera</li><li>✓ USB-C, 5G, Face ID</li><li>✓ 1yr 【entity-Apple¦canonical_name=Apple】 warranty</li></ul>
        <div style={{background:'#f1f8e9',padding:10,borderRadius:8}}><b>🚚 Delivery</b><br/>Free delivery by <b>Tomorrow</b> | 7-day replacement | COD ✓</div>
        <DeliveryTrack status="Packed"/>
      </div>
    </div>
    {/* Fullscreen modal - real life er moto */}
    {full&&<div onClick={()=>setFull(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.95)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <button onClick={()=>setFull(false)} style={{position:'absolute',top:15,right:15,background:'#fff',border:'none',borderRadius:'50%',width:40,height:40,fontSize:18}}>✕</button>
      <button onClick={(e)=>{e.stopPropagation();setIdx((idx+5)%6)}} style={{position:'absolute',left:15,width:48,height:48,borderRadius:'50%',border:'none',fontSize:20}}>‹</button>
      <div style={{display:'flex',gap:20,alignItems:'center',maxWidth:900,width:'100%'}}>
        <div style={{flex:2,background:s.bg,borderRadius:16,padding:'60px 30px',textAlign:'center',color:'#fff'}}>
          <div style={{fontSize:140}}>{s.icon}</div><h2>{s.title}</h2><p>{s.desc}</p>
          <div style={{display:'flex',gap:6,justifyContent:'center',marginTop:10}}>{SLIDES.map((_,i)=><div key={i} onClick={(e)=>{e.stopPropagation();setIdx(i)}} style={{width:10,height:10,borderRadius:'50%',background:i===idx?'#fff':'rgba(255,255,255,.4)',cursor:'pointer'}}/>)}</div>
        </div>
        {/* Right side text - pic er sathe suitable */}
        <div style={{flex:1,background:'#fff',borderRadius:16,padding:20}}>
          <span style={{background:'#e3f2fd',padding:'4px 10px',borderRadius:12,fontSize:11}}>{s.tag}</span>
          <h3 style={{margin:'10px 0'}}>{s.title}</h3><p style={{fontSize:14,color:'#555'}}>{s.desc}</p>
          <div style={{background:'#f8f9fa',padding:12,borderRadius:8,marginTop:10,fontSize:13}}>
            <b>💡 Keno eta khaas?</b><br/>{idx===0&&'Display te HDR10, 2000 nits brightness - rod e o clear'}
            {idx===1&&'48MP te 4x detail, raat eo clear photo'}
            {idx===2&&'Gaming + multitasking e kono lag nei'}
            {idx===3&&'Ek charge e sara din, 50% charge 30 min e'}
            {idx===4&&'Pore geleo vangbe na, pani te 30 min safe'}
            {idx===5&&'Box e sob original accessories, bill + warranty'}
          </div>
          <div style={{marginTop:10}}><b>₹{price.toLocaleString('en-IN')}</b> <b style={{color:'green'}}>{off}% off</b></div>
        </div>
      </div>
      <button onClick={(e)=>{e.stopPropagation();setIdx((idx+1)%6)}} style={{position:'absolute',right:15,width:48,height:48,borderRadius:'50%',border:'none',fontSize:20}}>›</button>
    </div>}
    <h3>🔁 Similar Products</h3>
    <div style={{display:'flex',gap:10,overflowX:'auto'}}>
      {['Galaxy S24 ₹49999','Pixel 8 ₹59999','OnePlus 12 ₹64999','iPhone 14 ₹59999'].map((n,i)=><div key={i} style={{minWidth:150,border:'1px solid #eee',borderRadius:10,padding:10,textAlign:'center'}}><div style={{fontSize:36}}>📱</div><small>{n}</small></div>)}
    </div>
    <Product3D/><PriceAlert/><Compare/><ReviewQA/>
  </div>);
}
