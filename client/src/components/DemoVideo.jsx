import {useState} from 'react';
export default function DemoVideo(){
  const load=()=>{try{return localStorage.getItem('mega_demo_video')||'';}catch(e){return '';}};
  const [url,setUrl]=useState(load);
  const [saved,setSaved]=useState(load);
  const save=()=>{try{localStorage.setItem('mega_demo_video',url);}catch(e){} setSaved(url);alert('Demo video link saved!');};
  const embed=saved.split('watch?v=').join('embed/').split('youtu.be/').join('youtube.com/embed/');
  return (<div style={{background:'#060606',border:'1px solid #353839',borderRadius:12,padding:15,marginTop:12}}>
    <h4 style={{color:'#e6edf3',margin:'0 0 8px'}}>🎬 Live Demo Video</h4>
    {saved!==''?(<div>
      <iframe width="100%" height="280" src={embed} title="demo" frameBorder="0" allowFullScreen style={{borderRadius:8,border:'1px solid #353839'}}></iframe>
      <button onClick={()=>{setUrl(saved);setSaved('');}} style={{marginTop:8,padding:'8px 12px',background:'#212122',color:'#e6edf3',border:'1px solid #353839',borderRadius:8}}>Change link</button>
    </div>):(<div>
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="YouTube / Loom embed link paste koro" style={{width:'100%',padding:10,borderRadius:8,border:'1px solid #353839',background:'#212122',color:'#e6edf3',boxSizing:'border-box'}}/>
      <button onClick={save} style={{marginTop:8,padding:'10px 16px',background:'#1f6feb',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Save Video</button>
      <p style={{color:'#8b949e',fontSize:12}}>Tomar project demo video er YouTube/Loom link dao - HR dekhte parbe</p>
    </div>)}
  </div>);
}
