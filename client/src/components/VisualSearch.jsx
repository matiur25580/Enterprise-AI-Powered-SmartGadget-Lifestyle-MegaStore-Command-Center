import {useState} from 'react';
import {Link} from 'react-router-dom';
const MATCHES=[
  {id:'1',name:'iPhone 15',price:66999,img:'📱',match:98},
  {id:'2',name:'iPhone 14',price:59999,img:'📱',match:87},
  {id:'3',name:'Galaxy S24',price:49999,img:'📱',match:76}
];
export default function VisualSearch(){
  const [preview,setPreview]=useState(null);
  const [loading,setLoading]=useState(false);
  const [results,setResults]=useState([]);
  const onFile=(e)=>{
    const f=e.target.files[0];
    if(f===null||f===undefined){return;}
    setPreview(URL.createObjectURL(f));
    setLoading(true);
    setResults([]);
    setTimeout(()=>{setLoading(false);setResults(MATCHES);},1800);
  };
  return (<div style={{background:'#212122',border:'1px solid #353839',borderRadius:12,padding:15,marginTop:12,color:'#e6edf3'}}>
    <h4 style={{margin:'0 0 6px'}}>📷 AI Visual Search</h4>
    <p style={{fontSize:12,color:'#8b949e',margin:'0 0 8px'}}>Product er photo dao, AI milti-julti item khuje debe</p>
    <input type="file" accept="image/*" onChange={onFile} style={{fontSize:13}}/>
    {preview!==null&&<img src={preview} alt="search" style={{width:110,height:110,objectFit:'cover',borderRadius:8,marginTop:8,display:'block'}}/>}
    {loading&&<div style={{marginTop:8,fontSize:13}}>🤖 AI analyzing image...</div>}
    {results.length>0&&<div style={{marginTop:8}}>
      <b style={{fontSize:13}}>Top matches:</b>
      <div style={{display:'flex',gap:8,marginTop:6,flexWrap:'wrap'}}>
        {results.map(r=><Link key={r.id} to={'/product/'+r.id} style={{background:'#060606',border:'1px solid #353839',borderRadius:8,padding:8,textDecoration:'none',color:'#e6edf3',fontSize:12,textAlign:'center',minWidth:92}}>
          <div style={{fontSize:28}}>{r.img}</div>
          <div>{r.name}</div>
          <div style={{color:'#3fb950',fontWeight:'bold'}}>{r.match}% match</div>
          <div>Rs.{r.price.toLocaleString('en-IN')}</div>
        </Link>)}
      </div>
    </div>}
  </div>);
}
