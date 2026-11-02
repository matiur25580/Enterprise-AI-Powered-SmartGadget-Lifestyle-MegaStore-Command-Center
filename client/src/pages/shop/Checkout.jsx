import {useState} from 'react';import axios from 'axios';import {Link,useNavigate} from 'react-router-dom';import {useStore} from '../../context/StoreContext.jsx';
import {calculateCartTotal} from '../../utils/commerce.js';
import {toast} from '../../utils/notifications.jsx';
const API=(import.meta.env.VITE_API_URL||'https://enterprise-ai-powered-smartgadget.onrender.com').replace(/\/$/,'');
export default function Checkout(){
  const [address,setAddress]=useState('');const [auth]=useState(()=>{try{return JSON.parse(localStorage.getItem('ms_auth')||'null')}catch{return null}});const [error,setError]=useState('');const [submitting,setSubmitting]=useState(false);
  const {cart,placeOrder,moveToWishlist}=useStore();const navigate=useNavigate();
  const total=calculateCartTotal(cart);
  const submit=async(e)=>{
    e.preventDefault();
    if(!auth?.token){const message='Sign in with a customer account before placing an order.';setError(message);toast.error(message);return}
    if(!cart.length){const message='Your cart is empty. Add a product before checkout.';setError(message);toast.error(message);return}
    setSubmitting(true);setError('');
    const loadingToast=toast.loading('Placing your order…');
    try{
      const response=await axios.post(`${API}/api/order/create`,{
        address:address.trim(),
        items:cart.map(item=>({productId:item._id,name:item.name,price:Number(item.price),qty:1})),status:'Pending'
      },{headers:{Authorization:`Bearer ${auth.token}`}});
      if(!response.data?.success)throw new Error(response.data?.message||'Order could not be placed');
      placeOrder(cart,address.trim());toast.success('Your order has been placed.',{id:loadingToast});navigate('/orders');
    }catch{const message='We couldn’t place your order. Please check your connection and try again.';setError(message);toast.error(message,{id:loadingToast});}
    finally{setSubmitting(false)}
  };
  const inp={width:'100%',padding:12,margin:'8px 0',borderRadius:8,border:'1px solid #ccc',boxSizing:'border-box'};
  return (<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f5f7fa'}}>
    <form onSubmit={submit} style={{background:'#fff',padding:30,borderRadius:8,width:'min(440px, calc(100% - 32px))',boxSizing:'border-box'}}>
      <h2>Checkout</h2>
      {!cart.length?<p>Your cart is empty. <Link to="/shop">Browse products</Link></p>:<>
        <div style={{marginBottom:16}}>{cart.map((item,index)=><div key={`${item._id}-${index}`} style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) auto',gap:12,alignItems:'center',padding:'8px 0',borderBottom:'1px solid #eee'}}><span>{item.name}</span><b>₹{Number(item.price||0).toLocaleString('en-IN')}</b><button type="button" onClick={()=>moveToWishlist(item)} style={{gridColumn:'1 / -1',justifySelf:'start',padding:'5px 10px',background:'#f3f4f6',border:'1px solid #ddd',borderRadius:5}}>Move to wishlist</button></div>)}<div style={{display:'flex',justifyContent:'space-between',paddingTop:12,fontSize:18}}><b>Total</b><b>₹{total.toLocaleString('en-IN')}</b></div></div>
        {!auth?.token&&<p>Sign in before checkout. <Link to="/login">Sign in</Link></p>}
        <label>Delivery address<textarea placeholder="Street, city, state, postal code" style={inp} value={address} onChange={e=>setAddress(e.target.value)} required/></label>
        <div style={{background:'#e3f2fd',padding:12,borderRadius:8,margin:'10px 0'}}>Payment: Cash on Delivery · Shipping: Free</div>
        {error&&<p role="alert" style={{color:'#b71c1c'}}>{error}</p>}
        <button disabled={submitting} style={{...inp,background:'#00c853',color:'#fff',border:'none',fontWeight:'bold',opacity:submitting?.65:1}}>{submitting?'Placing order...':'Place order'}</button>
      </>}
    </form>
  </div>);
}
