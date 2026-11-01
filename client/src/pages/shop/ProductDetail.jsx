import {useState} from 'react';import {useParams,Link} from 'react-router-dom';import {useStore} from '../../context/StoreContext.jsx';
import ReviewQA from '../../components/ReviewQA.jsx';import DeliveryTrack from '../../components/DeliveryTrack.jsx';
const DEMO={name:'iPhone 15 (128 GB)',price:66999,mrp:79900,rating:4.6,rc:2341,colors:['Black','Blue','Pink','Green'],sizes:['128 GB','256 GB','512 GB'],high:['6.1-inch Super Retina XDR','A16 Bionic Chip','48MP Camera','5G'],imgs:['📱','📲','🤳','✨','🎨','📸']};
export default function ProductDetail(){
  const {id}=useParams();const {addCart,toggleWish,wish}=useStore();
  const [color,setColor]=useState(0);const [size,setSize]=useState(0);const [imgIdx,setImgIdx]=useState(0);
  const off=Math.round((1-DEMO.price/DEMO.mrp)*100);
  const p={_id:id||'1',name:DEMO.name,price:DEMO.price};
  const isW=wish.find(x=>x._id===p._id);
  const scroll=(d)=>setImgIdx(i=>Math.min(Math.max(0,i+d),DEMO.imgs.length-1));
  const share=()=>{navigator.clipboard?.writeText(window.location.href);alert('✓ Product link copied! Share koro');};
  return (<div style={{maxWidth:1100,margin:'0 auto',padding:15,fontFamily:'sans-serif'}}>
    <Link to="/shop">← Back to Shop</Link>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginTop:10}}>
      {/* LEFT - Image gallery with horizontal scroll */}
      <div>
        <div style={{position:'relative',background:'#f8f9fa',borderRadius:12,padding:40,textAlign:'center'}}>
          <button onClick={()=>scroll(-1)} style={{position:'absolute',left:8,top:'45%',width:36,height:36,borderRadius:'50%',border:'none',background:'#fff',boxShadow:'0 2px 8px rgba(0,0,0,.2)'}}>‹</button>
          <div style={{fontSize:100}}>{DEMO.imgs[imgIdx]}</div>
          <button onClick={()=>scroll(1)} style={{position:'absolute',right:8,top:'45%',width:36,height:36,borderRadius:'50%',border:'none',background:'#fff',boxShadow:'0 2px 8px rgba(0,0,0,.2)'}}>›</button>
        </div>
        <div style={{display:'flex',gap:8,overflowX:'auto',marginTop:8,padding:'4px 0'}}>
          {DEMO.imgs.map((im,i)=><div key={i} onClick={()=>setImgIdx(i)} style={{minWidth:60,height:60,background:i===imgIdx?'#e3f2fd':'#f5f5f5',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,cursor:'pointer',border:i===imgIdx?'2px solid #2a5298':'2px solid transparent'}}>{im}</div>)}
        </div>
        <div style={{display:'flex',gap:8,marginTop:10}}>
          <button onClick={()=>{addCart(p)}} style={{flex:1,padding:12,background:'#ff9f00',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>🛒 ADD TO CART</button>
          <button onClick={()=>alert('✓ Order placed! Buy Now successful')} style={{flex:1,padding:12,background:'#fb641b',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>⚡ BUY NOW</button>
        </div>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button onClick={()=>{toggleWish(p);alert(isW?'✓ Removed from wishlist':'✓ Added to wishlist')}} style={{flex:1,padding:8,border:'1px solid #ddd',borderRadius:8,background:isW?'#ffebee':'#fff'}}>{isW?'❤️':'🤍'} WISHLIST</button>
          <button onClick={share} style={{flex:1,padding:8,border:'1px solid #ddd',borderRadius:8,background:'#fff'}}>🔗 SHARE</button>
        </div>
      </div>
      {/* RIGHT - Details */}
      <div>
        <h2>{DEMO.name}</h2>
        <div><span style={{background:'#388e3c',color:'#fff',padding:'2px 8px',borderRadius:4,fontSize:13}}>{DEMO.rating} ★</span> <small style={{color:'#666'}}>{DEMO.rc.toLocaleString()} ratings & 342 reviews</small></div>
        <div style={{margin:'10px 0'}}><span style={{fontSize:28,fontWeight:'bold'}}>₹{DEMO.price.toLocaleString('en-IN')}</span> <s style={{color:'#888'}}>₹{DEMO.mrp.toLocaleString('en-IN')}</s> <b style={{color:'#388e3c'}}>{off}% off</b></div>
        <div style={{fontSize:13,color:'#666'}}>Inclusive of all taxes | EMI from ₹{(DEMO.price/12).toFixed(0)}/mo</div>
        <h4>🎨 Colour</h4><div style={{display:'flex',gap:8}}>{DEMO.colors.map((c,i)=><button key={i} onClick={()=>{setColor(i);alert('✓ Colour selected: '+c)}} style={{padding:'8px 14px',borderRadius:8,border:i===color?'2px solid #2a5298':'1px solid #ddd',background:i===color?'#e3f2fd':'#fff'}}>{c}</button>)}</div>
        <h4>💾 Storage</h4><div style={{display:'flex',gap:8}}>{DEMO.sizes.map((s,i)=><button key={i} onClick={()=>setSize(i)} style={{padding:'8px 14px',borderRadius:8,border:i===size?'2px solid #2a5298':'1px solid #ddd',background:i===size?'#e3f2fd':'#fff'}}>{s}</button>)}</div>
        <h4>✨ Highlights</h4><ul style={{fontSize:14}}>{DEMO.high.map((h,i)=><li key={i}>✓ {h}</li>)}</ul>
        <div style={{background:'#f1f8e9',padding:10,borderRadius:8,marginTop:10}}><b>🚚 Delivery</b><br/>📍 PIN 700156 - Free delivery by <b>Tomorrow</b><br/>✓ 7-day replacement | ✓ 1yr warranty | ✓ COD available</div>
        <DeliveryTrack status="Packed"/>
      </div>
    </div>
    <h3 style={{marginTop:20}}>🔁 Similar Products</h3>
    <div style={{display:'flex',gap:10,overflowX:'auto',padding:'8px 0'}}>
      {['Galaxy S24','Pixel 8','OnePlus 12','iPhone 14','Nothing 2'].map((n,i)=><div key={i} style={{minWidth:160,border:'1px solid #eee',borderRadius:10,padding:10,textAlign:'center'}}><div style={{fontSize:40}}>📱</div><b style={{fontSize:13}}>{n}</b><div style={{color:'#2a5298',fontWeight:'bold'}}>₹{(45000+i*5000).toLocaleString('en-IN')}</div><button onClick={()=>alert('✓ Viewing '+n)} style={{marginTop:6,padding:'6px 10px',background:'#e3f2fd',border:'none',borderRadius:6,fontSize:12}}>View</button></div>)}
    </div>
    <ReviewQA/>
  </div>);
}
