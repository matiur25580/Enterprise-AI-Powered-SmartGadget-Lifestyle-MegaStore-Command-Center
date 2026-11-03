import {useState,useRef} from 'react';
const CAT_ICON={Mobile:'📱',AudioPower:'🎧',Protection:'🛡️',Storage:'💾',Computing:'💻',Lifestyle:'⌚'};
const CAT_GRAD={Mobile:'linear-gradient(135deg,#667eea,#764ba2)',AudioPower:'linear-gradient(135deg,#f093fb,#f5576c)',Protection:'linear-gradient(135deg,#4facfe,#00f2fe)',Storage:'linear-gradient(135deg,#43e97b,#38f9d7)',Computing:'linear-gradient(135deg,#fa709a,#fee140)',Lifestyle:'linear-gradient(135deg,#a8edea,#fed6e3)'};
const normImgs=(a)=>(Array.isArray(a)?a:[]).map(im=>typeof im==='string'?{url:im,caption:''}:(im&&typeof im==='object'?{url:im.url||im.src||'',caption:im.caption||im.alt||''}:null)).filter(x=>x&&x.url);
const normHl=(a)=>(Array.isArray(a)?a:[]).filter(x=>x&&(x.title||x.icon));
export default function ProductGallery({images=[],highlights=[],name='',category=''}){
  const imgs=normImgs(images),hls=normHl(highlights);
  const slides=[];
  const n=Math.max(imgs.length,hls.length);
  for(let i=0;i<n;i++){ if(imgs[i])slides.push({t:'p',d:imgs[i]}); if(hls[i])slides.push({t:'h',d:hls[i]}); }
  const [ix,setIx]=useState(0);
  const [fs,setFs]=useState(false);
  const [zoom,setZoom]=useState(1);
  const [bad,setBad]=useState({});
  const [wish,setWish]=useState(false);
  const [copied,setCopied]=useState(false);
  const tx=useRef(null);
  const skey=(t,idx)=>(t==='p'?'p':'h')+idx;
  const list=slides.map((s,idx)=>({s,idx})).filter(({s,idx})=>!bad[skey(s.t,idx)]);
  const safe=list.length?Math.min(ix,list.length-1):0;
  const cur=list[safe];
  const markBad=(idx,t)=>setBad(b=>({...b,[skey(t,idx)]:1}));
  const go=d=>{ if(!list.length)return; setIx((safe+d+list.length)%list.length); };
  const onTS=e=>{ tx.current=e.touches[0].clientX; };
  const onTE=e=>{ if(tx.current==null)return; const dx=e.changedTouches[0].clientX-tx.current; if(dx>40)go(-1); else if(dx<-40)go(1); tx.current=null; };
  const share=async()=>{ const url=window.location.href; try{ if(navigator.share){ await navigator.share({title:name,url}); }else{ await navigator.clipboard.writeText(url); setCopied(true); setTimeout(()=>setCopied(false),2000); } }catch(e){} };
  const box={position:'relative',width:'100%',aspectRatio:'1/1',borderRadius:'16px',overflow:'hidden',background:'#f3f4f6',touchAction:'pan-y'};
  if(!cur) return (<div style={{...box,background:CAT_GRAD[category]||'#e5e7eb',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'90px'}}>{CAT_ICON[category]||'📦'}</div>);
  return (<div>
    <div style={box} onTouchStart={onTS} onTouchEnd={onTE}>
      {cur.s.t==='p'
        ? <img src={cur.s.d.url} alt={cur.s.d.caption||name} onError={()=>markBad(cur.idx,'p')} onClick={()=>setFs(true)} style={{width:'100%',height:'100%',objectFit:'cover',cursor:'zoom-in'}}/>
        : <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#1e3a8a,#7c3aed)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#fff',padding:'24px',textAlign:'center'}}>
            <div style={{fontSize:'56px'}}>{cur.s.d.icon}</div>
            <div style={{fontSize:'26px',fontWeight:'800',marginTop:'12px'}}>{cur.s.d.title}</div>
            <div style={{fontSize:'15px',opacity:'0.85',marginTop:'6px'}}>{cur.s.d.subtitle}</div>
          </div>}
      <button onClick={()=>setWish(!wish)} style={{position:'absolute',top:'12px',right:'12px',width:'40px',height:'40px',borderRadius:'50%',border:'none',background:'rgba(255,255,255,0.92)',fontSize:'19px',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>{wish?'❤️':'♡'}</button>
      <button onClick={share} style={{position:'absolute',top:'60px',right:'12px',width:'40px',height:'40px',borderRadius:'50%',border:'none',background:'rgba(255,255,255,0.92)',fontSize:'17px',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>{copied?'✓':'🔗'}</button>
      {list.length>1&&(<div>
        <button onClick={()=>go(-1)} style={{position:'absolute',left:'8px',top:'50%',transform:'translateY(-50%)',width:'36px',height:'36px',borderRadius:'50%',border:'none',background:'rgba(255,255,255,0.9)',cursor:'pointer',fontSize:'18px'}}>‹</button>
        <button onClick={()=>go(1)} style={{position:'absolute',right:'8px',top:'50%',transform:'translateY(-50%)',width:'36px',height:'36px',borderRadius:'50%',border:'none',background:'rgba(255,255,255,0.9)',cursor:'pointer',fontSize:'18px'}}>›</button>
      </div>)}
      <div style={{position:'absolute',bottom:'10px',left:'0',right:'0',display:'flex',justifyContent:'center',gap:'6px'}}>
        {list.map((_,i)=>(<span key={i} onClick={()=>setIx(i)} style={{width:safe===i?'22px':'8px',height:'8px',borderRadius:'4px',background:safe===i?'#fff':'rgba(255,255,255,0.5)',cursor:'pointer',transition:'all 0.2s'}}/>))}
      </div>
    </div>
    {cur.s.t==='p'&&cur.s.d.caption&&(<div style={{textAlign:'center',fontSize:'13px',color:'#6b7280',marginTop:'8px',padding:'0 12px'}}>{cur.s.d.caption}</div>)}
    {list.length>1&&(<div style={{display:'flex',gap:'8px',overflowX:'auto',marginTop:'10px',paddingBottom:'4px'}}>
      {list.map(({s,idx})=>((<div key={skey(s.t,idx)} onClick={()=>setIx(list.findIndex(x=>x.idx===idx))} style={{minWidth:'64px',width:'64px',height:'64px',borderRadius:'10px',overflow:'hidden',cursor:'pointer',border:safe===list.findIndex(x=>x.idx===idx)?'2px solid #f97316':'2px solid transparent',background:'#f3f4f6'}}>
        {s.t==='p'
          ? <img src={s.d.url} alt="" onError={()=>markBad(idx,'p')} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          : <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#1e3a8a,#7c3aed)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>{s.d.icon}</div>}
      </div>)))}
    </div>)}
    {fs&&cur.s.t==='p'&&(<div onClick={()=>{setFs(false);setZoom(1);}} style={{position:'fixed',inset:'0',background:'rgba(0,0,0,0.94)',zIndex:'9999',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} onTouchStart={onTS} onTouchEnd={onTE}>
      <button onClick={()=>{setFs(false);setZoom(1);}} style={{position:'absolute',top:'16px',right:'16px',width:'44px',height:'44px',borderRadius:'50%',border:'none',background:'#fff',fontSize:'20px',cursor:'pointer'}}>✕</button>
      <div style={{display:'flex',gap:'10px',position:'absolute',bottom:'24px'}}>
        <button onClick={e=>{e.stopPropagation();setZoom(z=>Math.max(1,z-0.5));}} style={{width:'44px',height:'44px',borderRadius:'50%',border:'none',background:'#fff',fontSize:'20px',cursor:'pointer'}}>−</button>
        <button onClick={e=>{e.stopPropagation();setZoom(z=>Math.min(3,z+0.5));}} style={{width:'44px',height:'44px',borderRadius:'50%',border:'none',background:'#fff',fontSize:'20px',cursor:'pointer'}}>+</button>
      </div>
      <img src={cur.s.d.url} alt={cur.s.d.caption||name} onClick={e=>e.stopPropagation()} style={{maxWidth:'94vw',maxHeight:'80vh',objectFit:'contain',transform:'scale('+zoom+')',transition:'transform 0.2s'}}/>
      {cur.s.d.caption&&(<div style={{color:'#fff',marginTop:'14px',fontSize:'14px',padding:'0 20px',textAlign:'center'}}>{cur.s.d.caption}</div>)}
    </div>)}
  </div>);
}
