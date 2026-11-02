import {useState} from 'react';import axios from 'axios';
import {toast} from '../utils/notifications.jsx';
export default function PhotoUpload({onUpload}){
  const [preview,setPreview]=useState(null);const [loading,setLoading]=useState(false);
  const handle=async(e)=>{
    const file=e.target.files[0];if(!file) return;
    setPreview(URL.createObjectURL(file));setLoading(true);
    try{
      const fd=new FormData();fd.append('photo',file);
      const r=await axios.post('https://enterprise-ai-powered-smartgadget.onrender.com/api/upload/product-photo',fd);
      toast.success('Photo uploaded successfully.');onUpload&&onUpload(r.data.url);
    }catch{toast.error('Photo upload failed. You can keep using the preview.');onUpload&&onUpload(preview)}
    setLoading(false);
  };
  return (<div style={{border:'2px dashed #2a5298',borderRadius:10,padding:15,textAlign:'center',marginTop:10}}>
    <b>📷 Real Product Photo Upload</b><br/>
    <input type="file" accept="image/*" onChange={handle} style={{marginTop:8}}/>
    {preview&&<img src={preview} alt="preview" style={{width:120,height:120,objectFit:'cover',borderRadius:8,marginTop:8}}/>}
    {loading&&<div>Uploading...</div>}
    <div style={{fontSize:11,opacity:.6,marginTop:6}}>Max 5MB | JPG, PNG</div>
  </div>);
}
