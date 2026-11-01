import {Link} from 'react-router-dom';import {useState} from 'react';
export default function BulkUpload(){
  const [done,setDone]=useState(false);
  return (<div style={{padding:20,maxWidth:600,margin:'0 auto',fontFamily:'sans-serif'}}>
    <Link to="/seller">Back</Link><h2>Bulk Upload CSV</h2>
    <div style={{border:'2px dashed #2a5298',borderRadius:12,padding:30,textAlign:'center'}}>
      <p>CSV: name,price,mrp,category,stock</p>
      <input type="file" accept=".csv" style={{marginTop:10}}/>
      <br/><button onClick={()=>{setDone(true);alert('100 products uploaded')}} style={{marginTop:12,padding:'10px 20px',background:'#2a5298',color:'#fff',border:'none',borderRadius:8}}>Upload</button>
    </div>
    {done&&<div style={{background:'#e8f5e9',padding:12,borderRadius:8,marginTop:12}}>Success 100/100 imported</div>}
  </div>);
}
