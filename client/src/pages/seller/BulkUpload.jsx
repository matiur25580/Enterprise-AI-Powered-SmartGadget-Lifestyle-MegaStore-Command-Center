import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from '../../utils/notifications.jsx';
import {API} from '../../utils/api.js';
import {parseProductCsv} from '../../utils/parseProductCsv.js';

const authHeaders=()=>{
  try{
    const auth=JSON.parse(localStorage.getItem('ms_auth')||'null');
    return {Authorization:`Bearer ${auth?.token||''}`};
  }catch{
    return {Authorization:''};
  }
};

const TEMPLATE='name,price,mrp,category,stock,brand\r\n"Phone, Blue",29999,34999,Mobile,50,Example Brand\r\n';

export default function BulkUpload(){
  const [file,setFile]=useState(null);
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(null);
  const downloadTemplate=()=>{
    const url=URL.createObjectURL(new Blob([TEMPLATE],{type:'text/csv;charset=utf-8'}));
    const link=document.createElement('a');
    link.href=url;
    link.download='megastore-product-template.csv';
    link.click();
    setTimeout(()=>URL.revokeObjectURL(url),0);
  };
  const upload=async()=>{
    if(!file)return toast.error('Choose a CSV file first.');
    if(file.size>2*1024*1024)return toast.error('Choose a CSV smaller than 2 MB.');
    let products;
    try{
      products=parseProductCsv(await file.text());
    }catch(error){
      return toast.error(error.message);
    }
    setLoading(true);
    setResult(null);
    let imported=0;
    const failures=[];
    for(let index=0;index<products.length;index++){
      try{
        await axios.post(`${API}/api/product/add`,products[index],{headers:authHeaders()});
        imported++;
      }catch(error){
        failures.push({row:index+2,message:error.response?.data?.message||'Request failed'});
      }
    }
    setResult({imported,failed:failures.length,failures});
    if(failures.length)toast.error(`${imported} imported; ${failures.length} row(s) failed.`);
    else toast.success(`${imported} product(s) imported successfully.`);
    setLoading(false);
  };

  return (
    <main style={{maxWidth:760,margin:'0 auto',padding:'clamp(16px,4vw,32px)',fontFamily:'sans-serif'}}>
      <Link to="/seller">← Seller dashboard</Link>
      <h1>Import products</h1>
      <p>Upload a CSV with name, category, price, and stock columns. Optional columns: MRP and brand.</p>
      <p>Supported categories: Mobile, AudioPower, Protection, Storage, Computing, Lifestyle.</p>
      <section style={{display:'grid',gap:12,padding:20,border:'1px dashed #64748b',borderRadius:12}}>
        <button type="button" onClick={downloadTemplate} style={{padding:12,border:0,borderRadius:8,background:'#1f6feb',color:'#fff',fontWeight:700,cursor:'pointer'}}>Download CSV template</button>
        <label>Product CSV<input type="file" accept=".csv,text/csv" onChange={event=>{setFile(event.target.files?.[0]||null);setResult(null);}} style={{display:'block',marginTop:8}}/></label>
        <button type="button" disabled={!file||loading} onClick={upload} style={{padding:12,border:0,borderRadius:8,background:'#238636',color:'#fff',fontWeight:700,cursor:loading?'wait':'pointer',opacity:(!file||loading)?0.6:1}}>{loading?'Importing…':'Import products'}</button>
      </section>
      {result&&<section aria-live="polite" style={{marginTop:16,padding:16,borderRadius:10,background:result.failed?'#fff7ed':'#ecfdf5'}}>
        <strong>{result.imported} imported · {result.failed} failed</strong>
        {result.failures.map(failure=><p key={failure.row}>Row {failure.row}: {failure.message}</p>)}
      </section>}
    </main>
  );
}
