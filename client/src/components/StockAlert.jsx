import {useState} from 'react';
const LOW=[
  {name:'iPhone 15',stock:3},
  {name:'AirPods Pro',stock:5},
  {name:'HP Laptop 15s',stock:2}
];
export default function StockAlert(){
  const [on,setOn]=useState(false);
  const enable=()=>{
    setOn(true);
    if(typeof Notification!=='undefined'&&Notification.requestPermission){
      Notification.requestPermission().then(p=>{
        if(p==='granted'){alert('Stock alert ON! Low stock hole push pabe.');}
        else{alert('Stock alert ON (in-app).');}
      });
    }else{alert('Stock alert ON (in-app).');}
  };
  const restock=(n)=>{alert(n+' er jonno supplier ke order pathano hoyeche!');};
  return (<div style={{background:'#212122',border:'1px solid #353839',borderRadius:12,padding:15,marginTop:12,color:'#e6edf3'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h4 style={{margin:0}}>⚠️ Low Stock Alert</h4>
      {on===false&&<button onClick={enable} style={{padding:'8px 12px',background:'#1f6feb',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Enable Push</button>}
      {on&&<span style={{fontSize:12,color:'#3fb950'}}>● Push ON</span>}
    </div>
    {LOW.map((p,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'#060606',border:'1px solid #353839',borderRadius:8,padding:'8px 12px',marginTop:8,fontSize:13}}>
      <span>{p.name} - <b style={{color:'#da3633'}}>only {p.stock} left</b></span>
      <button onClick={()=>restock(p.name)} style={{padding:'6px 10px',background:'#238636',color:'#fff',border:'none',borderRadius:6}}>Restock</button>
    </div>)}
  </div>);
}
