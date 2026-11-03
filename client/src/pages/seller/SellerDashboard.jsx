import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SellerChat from '../../components/SellerChat.jsx';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import {toast} from '../../utils/notifications.jsx';
import {API} from '../../utils/api.js';

function readAuth(){
  try{
    return JSON.parse(localStorage.getItem('ms_auth')||'null');
  }catch{
    return null;
  }
}

export default function SellerDashboard(){
  const auth=readAuth();
  const [products,setProducts]=useState([]);
  const [edit,setEdit]=useState(null);
  const [deleteId,setDeleteId]=useState(null);
  const [loading,setLoading]=useState(true);
  const [loadError,setLoadError]=useState('');
  const [dark,setDark]=useState(false);
  const [now,setNow]=useState(new Date());
  const [saving,setSaving]=useState(false);
  const headers={Authorization:`Bearer ${auth?.token||''}`};
  const background=dark?'#121826':'#f3f6fa';
  const surface=dark?'#1e293b':'#fff';
  const text=dark?'#e5e7eb':'#172033';

  useEffect(()=>{
    const timer=setInterval(()=>setNow(new Date()),1000);
    return ()=>clearInterval(timer);
  },[]);

  useEffect(()=>{
    let active=true;
    axios.get(`${API}/api/product/mine`,{headers}).then(response=>{
      if(active)setProducts(response.data.products||[]);
    }).catch(()=>{
      if(active)setLoadError('Your catalog could not be loaded. Please try again.');
    }).finally(()=>{
      if(active)setLoading(false);
    });
    return ()=>{active=false;};
  },[]);

  const updateProduct=async(nextProduct,message)=>{
    setSaving(true);
    try{
      const response=await axios.put(`${API}/api/product/${nextProduct._id}`,nextProduct,{headers});
      setProducts(items=>items.map(item=>item._id===nextProduct._id?response.data.product:item));
      setEdit(null);
      toast.success(message);
    }catch(error){
      toast.error(error.response?.data?.message||'The product could not be updated.');
    }finally{
      setSaving(false);
    }
  };

  const restock=product=>updateProduct({...product,stock:Number(product.stock)+20},'Stock updated successfully.');
  const save=()=>updateProduct(edit,'Product updated successfully.');

  const confirmDelete=async()=>{
    try{
      await axios.delete(`${API}/api/product/${deleteId}`,{headers});
      setProducts(items=>items.filter(product=>product._id!==deleteId));
      toast.success('Product deleted successfully.');
    }catch(error){
      toast.error(error.response?.data?.message||'The product could not be deleted.');
    }finally{
      setDeleteId(null);
    }
  };

  const date=`${String(now.getDate()).padStart(2,'0')}.${String(now.getMonth()+1).padStart(2,'0')}.${now.getFullYear()}`;
  const time=now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  const lowStock=products.filter(product=>Number(product.stock)<5);

  return (
    <main style={{minHeight:'100vh',background,color:text,padding:'clamp(16px,3vw,32px)',fontFamily:'sans-serif'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap',marginBottom:24}}>
        <div>
          <Link to="/" style={{color:dark?'#93c5fd':'#1d4ed8'}}>← Home</Link>
          <h1 style={{margin:'10px 0 4px'}}>Seller dashboard</h1>
          <strong style={{color:dark?'#86efac':'#15803d'}}>SELLER</strong>
          <div style={{fontSize:13,opacity:.75,marginTop:6}}>{date} | {time}</div>
        </div>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          <Link to="/seller/bulk" style={{padding:'10px 14px',background:'#1f6feb',color:'#fff',textDecoration:'none',borderRadius:8,fontWeight:700}}>Manage catalog</Link>
          <button type="button" onClick={()=>setDark(value=>!value)} aria-label="Toggle dashboard theme" style={{padding:'10px 14px',borderRadius:8,border:'1px solid #94a3b8',background:surface,color:text,cursor:'pointer'}}>{dark?'☀️ Light':'🌙 Dark'}</button>
        </div>
      </header>

      <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))',gap:12,marginBottom:20}}>
        {[
          ['Products',products.length],
          ['Low stock',lowStock.length],
          ['Units in stock',products.reduce((sum,product)=>sum+Number(product.stock||0),0)],
        ].map(([label,value])=>(
          <div key={label} style={{padding:18,background:surface,borderRadius:12,border:'1px solid #94a3b833'}}>
            <div style={{fontSize:13,opacity:.75}}>{label}</div><strong style={{fontSize:28}}>{value}</strong>
          </div>
        ))}
      </section>

      {lowStock.length>0&&(
        <section aria-label="Low stock products" style={{background:surface,padding:16,borderRadius:12,marginBottom:18,border:'1px solid #f59e0b'}}>
          <h2 style={{fontSize:18,margin:'0 0 10px'}}>Low-stock alert ({lowStock.length})</h2>
          {lowStock.map(product=>(
            <div key={product._id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,flexWrap:'wrap',padding:'8px 0'}}>
              <span>{product.name} — {product.stock} remaining</span>
              <button type="button" onClick={()=>restock(product)} style={{padding:'7px 10px',background:'#238636',color:'#fff',border:0,borderRadius:6,cursor:'pointer'}}>Restock +20</button>
            </div>
          ))}
        </section>
      )}

      <section style={{background:surface,padding:18,borderRadius:12,border:'1px solid #94a3b833'}}>
        <h2 style={{marginTop:0}}>Your products</h2>
        {loading&&<p role="status">Loading your catalog…</p>}
        {loadError&&<p role="alert" style={{color:'#dc2626'}}>{loadError}</p>}
        {!loading&&!loadError&&products.length===0&&<p>You have no products in your catalog yet. <Link to="/seller/bulk">Open catalog management</Link>.</p>}
        {!loading&&products.map(product=>(
          <article key={product._id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap',borderTop:'1px solid #94a3b833',padding:'14px 0'}}>
            <div><strong>{product.name}</strong><br/><small>{`₹${Number(product.price).toLocaleString('en-IN')} · Stock: ${product.stock}`}</small></div>
            <div style={{display:'flex',gap:8}}>
              <button type="button" onClick={()=>setEdit({...product})} style={{padding:'8px 12px',background:'#1f6feb',color:'#fff',border:0,borderRadius:6,cursor:'pointer'}}>Edit</button>
              <button type="button" onClick={()=>setDeleteId(product._id)} style={{padding:'8px 12px',background:'#b91c1c',color:'#fff',border:0,borderRadius:6,cursor:'pointer'}}>Delete</button>
            </div>
          </article>
        ))}
      </section>

      {edit&&(
        <div role="dialog" aria-modal="true" aria-labelledby="edit-product-title" style={{position:'fixed',inset:0,background:'rgba(15,23,42,.65)',display:'grid',placeItems:'center',zIndex:100,padding:16}}>
          <form onSubmit={event=>{event.preventDefault();save();}} style={{background:surface,color:text,padding:20,borderRadius:12,width:'min(420px,100%)'}}>
            <h2 id="edit-product-title">Edit product</h2>
            <label style={{display:'block'}}>Name<input required maxLength={120} value={edit.name} onChange={event=>setEdit({...edit,name:event.target.value})} style={{width:'100%',padding:10,margin:'6px 0 12px',boxSizing:'border-box'}}/></label>
            <label style={{display:'block'}}>Price<input required min="0" type="number" value={edit.price} onChange={event=>setEdit({...edit,price:Number(event.target.value)})} style={{width:'100%',padding:10,margin:'6px 0 12px',boxSizing:'border-box'}}/></label>
            <label style={{display:'block'}}>Stock<input required min="0" type="number" value={edit.stock} onChange={event=>setEdit({...edit,stock:Number(event.target.value)})} style={{width:'100%',padding:10,margin:'6px 0 12px',boxSizing:'border-box'}}/></label>
            <div style={{display:'flex',gap:10}}><button disabled={saving} type="submit" style={{flex:1,padding:10,background:'#238636',color:'#fff',border:0,borderRadius:6,cursor:'pointer'}}>{saving?'Saving…':'Save changes'}</button><button type="button" onClick={()=>setEdit(null)} style={{flex:1,padding:10,border:0,borderRadius:6,cursor:'pointer'}}>Cancel</button></div>
          </form>
        </div>
      )}
      {deleteId&&<ConfirmDialog title="Delete product?" message="This product will be removed from your catalog." confirmLabel="Delete product" danger onCancel={()=>setDeleteId(null)} onConfirm={confirmDelete}/>}
      <SellerChat/>
    </main>
  );
}
