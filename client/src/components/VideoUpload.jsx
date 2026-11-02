import {useState} from 'react';
import axios from 'axios';
import {toast} from '../utils/notifications.jsx';
const API='https://enterprise-ai-powered-smartgadget.onrender.com';
export default function VideoUpload(){
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);
  const onFile=(e)=>{
    const f=e.target.files[0];
    if(f===null||f===undefined){return;}
    if(f.size>50*1024*1024){toast.error('Choose a video smaller than 50 MB.');return;}
    setLoading(true);
    const loadingToast=toast.loading('Uploading your video…');
    const fd=new FormData();
    fd.append('video',f);
    axios.post(API+'/api/upload/review-video',fd).then(()=>{
      setLoading(false);setDone(true);toast.success('Video review uploaded.',{id:loadingToast});
    }).catch(()=>{
      setLoading(false);toast.error('Video upload failed. Please try again.',{id:loadingToast});
    });
  };
  return (<div style={{background:'#212122',border:'1px solid #353839',borderRadius:12,padding:12,marginTop:10,color:'#e6edf3'}}>
    <h4 style={{margin:'0 0 6px'}}>🎥 Video Unboxing Review</h4>
    <p style={{fontSize:12,color:'#8b949e',margin:'0 0 8px'}}>Product er unboxing video upload koro (max 50MB)</p>
    <input type="file" accept="video/*" onChange={onFile} style={{fontSize:13}}/>
    {loading&&<div style={{fontSize:13,marginTop:6}}>Uploading video...</div>}
    {done&&<div style={{fontSize:13,marginTop:6,color:'#3fb950'}}>✓ Video review live! Thanks.</div>}
  </div>);
}
