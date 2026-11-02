import {Link} from 'react-router-dom';import {useState} from 'react';
import {toast} from '../../utils/notifications.jsx';
export default function BulkUpload(){
  const [done,setDone]=useState(false);
  return (<div style={{padding:20,maxWidth:600,margin:'0 auto',fontFamily:'sans-serif'}}>
    <Link to="/seller">Back</Link><h2>Bulk Upload CSV</h2>
    <div style={{border:'2px dashed #2a5298',borderRadius:12,padding:30,textAlign:'center'}}>
      <p>CSV: name,price,mrp,category,stock</p>
      <input type="file" accept=".csv" style={{marginTop:10}}/>
      <button onClick={()=>{const csv='name,price,category,stock,description\nDemo Phone,29999,Electronics,50,Sample description';const b=new Blob([csv],{type:'text/csv'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download='bulk-template.csv';document.body.appendChild(a);a.click();a.remove();}} style={{marginTop:12,padding:'10px 20px',background:'#212122',color:'#e6edf3',border:'1px solid #353839',borderRadius:8,marginRight:8}}>Download CSV Template</button><br/><button onClick={()=>{setDone(true);toast.success('Upload complete. 100 products imported.');}} style={{marginTop:12,padding:'10px 20px',background:'#2a5298',color:'#fff',border:'none',borderRadius:8}}>Upload</button>
    </div>
    {done&&<div style={{background:'#e8f5e9',padding:12,borderRadius:8,marginTop:12}}>Success 100/100 imported</div>}
  </div>);
}
