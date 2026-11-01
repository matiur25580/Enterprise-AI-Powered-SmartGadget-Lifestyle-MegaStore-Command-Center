import {useState,useRef} from 'react';
export default function Product3D(){
  const [rot,setRot]=useState(0);const [drag,setDrag]=useState(false);const startX=useRef(0);const startRot=useRef(0);
  const down=(e)=>{setDrag(true);startX.current=e.clientX||e.touches?.[0]?.clientX;startRot.current=rot};
  const move=(e)=>{if(!drag) return;const x=e.clientX||e.touches?.[0]?.clientX;let r=startRot.current+(x-startX.current)*0.8;r=Math.max(-180,Math.min(180,r));setRot(Math.round(r))};
  const up=()=>setDrag(false);
  const reset=()=>setRot(0);
  return (<div style={{background:'#fff',padding:15,borderRadius:12,marginTop:15,border:'1px solid #eee'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><h3>🔄 3D View - <small>drag kore ±180° ghurau</small></h3><button onClick={reset} style={{padding:'6px 12px',borderRadius:6,border:'1px solid #ddd',background:'#f5f5f5'}}>↺ Reset</button></div>
    <div onMouseDown={down} onMouseMove={move} onMouseUp={up} onMouseLeave={up} onTouchStart={down} onTouchMove={move} onTouchEnd={up}
      style={{perspective:800,padding:'30px 10px',cursor:drag?'grabbing':'grab',userSelect:'none',touchAction:'pan-y'}}>
      <div style={{transform:`rotateY(${rot}deg)`,transition:drag?'none':'transform .2s',transformStyle:'preserve-3d',textAlign:'center'}}>
        <div style={{fontSize:110,display:'inline-block',background:'linear-gradient(135deg,#0f2027,#2c5364)',borderRadius:20,padding:'30px 50px',color:'#fff',boxShadow:'0 10px 30px rgba(0,0,0,.3)'}}>📱</div>
      </div>
      <div style={{textAlign:'center',marginTop:10}}>
        <input type="range" min={-180} max={180} value={rot} onChange={e=>setRot(+e.target.value)} style={{width:'80%'}}/>
        <div style={{fontSize:13,color:'#666'}}>Rotation: <b>{rot}°</b> {rot===0?'| Front':rot>0?`| Right ${rot}°`:`| Left ${Math.abs(rot)}°`}</div>
        <div style={{display:'flex',justifyContent:'center',gap:6,marginTop:6}}>
          <button onClick={()=>setRot(-180)} style={{padding:'4px 10px',borderRadius:6,border:'1px solid #ddd'}}>-180°</button>
          <button onClick={()=>setRot(-90)} style={{padding:'4px 10px',borderRadius:6,border:'1px solid #ddd'}}>-90°</button>
          <button onClick={()=>setRot(0)} style={{padding:'4px 10px',borderRadius:6,border:'1px solid #ddd'}}>Front</button>
          <button onClick={()=>setRot(90)} style={{padding:'4px 10px',borderRadius:6,border:'1px solid #ddd'}}>+90°</button>
          <button onClick={()=>setRot(180)} style={{padding:'4px 10px',borderRadius:6,border:'1px solid #ddd'}}>+180°</button>
        </div>
      </div>
    </div>
    {/* Material + Key Details */}
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:10}}>
      <div style={{background:'#f8f9fa',padding:12,borderRadius:8}}>
        <h4>🧱 Material & Build</h4>
        <ul style={{fontSize:13,margin:0,paddingLeft:18}}>
          <li><b>Frame:</b> Aerospace-grade aluminium</li>
          <li><b>Front:</b> Ceramic Shield (tougher than glass)</li>
          <li><b>Back:</b> Textured matte glass</li>
          <li><b>Water:</b> IP68 - 6m depth 30min</li>
          <li><b>Weight:</b> 171g | <b>Thickness:</b> 7.8mm</li>
        </ul>
      </div>
      <div style={{background:'#f8f9fa',padding:12,borderRadius:8}}>
        <h4>📋 Key Specifications</h4>
        <table style={{fontSize:13,width:'100%'}}>
          <tbody>
            {[['Display','6.1" OLED, 2556x1179, 120Hz'],['Chip','A16 Bionic (4nm)'],['RAM / Storage','6GB / 128GB NVMe'],['Camera','48MP + 12MP UW'],['Battery','3349mAh, 20W fast'],['OS','iOS 17, 5yr update'],['SIM','Dual SIM + eSIM'],['In Box','Phone, USB-C, ejector pin']].map((r,i)=><tr key={i} style={{borderBottom:'1px solid #eee'}}><td style={{padding:'4px 0',color:'#666'}}>{r[0]}</td><td style={{fontWeight:'500'}}>{r[1]}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
    <div style={{marginTop:10,background:'#e8f5e9',padding:10,borderRadius:8,fontSize:13}}>✓ <b>Enterprise QC Passed:</b> 42-point inspection | Genuine product | GST invoice | 7-day replacement</div>
  </div>);
}
