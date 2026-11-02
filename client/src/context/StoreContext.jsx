import {createContext,useContext,useState,useEffect} from 'react';
const Ctx=createContext();export const useStore=()=>useContext(Ctx);
export function StoreProvider({children}){
  const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem('ms_cart')||'[]'));
  const [wish,setWish]=useState(()=>JSON.parse(localStorage.getItem('ms_wish')||'[]'));
  const [orders,setOrders]=useState(()=>JSON.parse(localStorage.getItem('ms_orders')||'[]'));
  const [addrs,setAddrs]=useState(()=>JSON.parse(localStorage.getItem('ms_addr')||'[{"id":1,"label":"Home","name":"Rubel Ali","phone":"9876543210","pin":"700156","addr":"Newtown, Kolkata, WB"}]'));
  useEffect(()=>localStorage.setItem('ms_cart',JSON.stringify(cart)),[cart]);
  useEffect(()=>localStorage.setItem('ms_wish',JSON.stringify(wish)),[wish]);
  useEffect(()=>localStorage.setItem('ms_orders',JSON.stringify(orders)),[orders]);
  useEffect(()=>localStorage.setItem('ms_addr',JSON.stringify(addrs)),[addrs]);
  const addCart=p=>{setCart(c=>[...c,p]);alert('✓ Added to cart: '+p.name)};
  const toggleWish=p=>{setWish(w=>w.find(x=>x._id===p._id)?w.filter(x=>x._id!==p._id):[...w,p]);};
  const moveToCart=p=>{setCart(c=>[...c,p]);setWish(w=>w.filter(x=>x._id!==p._id));};
  const moveToWishlist=p=>{setWish(w=>w.some(x=>x._id===p._id)?w:[p,...w]);setCart(c=>{const index=c.findIndex(x=>x._id===p._id);return index<0?c:c.filter((_,i)=>i!==index)});};
  const placeOrder=(items,addr)=>{const order={id:'MS-'+Date.now().toString().slice(-6),items,date:new Date().toLocaleString('en-IN'),status:'Confirmed',addr};setOrders(previous=>[order,...previous]);setCart([]);return order;};
  const returnOrder=(id,reason)=>{setOrders(o=>o.map(x=>x.id===id?{...x,status:'Return Requested: '+reason}:x));alert('✓ Return request submitted successfully');};
  return <Ctx.Provider value={{cart,setCart,addCart,wish,toggleWish,moveToCart,moveToWishlist,orders,placeOrder,returnOrder,addrs,setAddrs}}>{children}</Ctx.Provider>;
}
