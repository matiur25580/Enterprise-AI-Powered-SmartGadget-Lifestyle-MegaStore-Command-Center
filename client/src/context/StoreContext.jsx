import {createContext,useContext,useState,useEffect} from 'react';
import {addCartItem} from '../utils/commerce.js';
import {notifyCartAdded,toast} from '../utils/notifications.jsx';
const Ctx=createContext();export const useStore=()=>useContext(Ctx);
function readStoredArray(key){
  try{
    const stored=localStorage.getItem(key);
    if(stored===null)return [];
    const parsed=JSON.parse(stored);
    if(!Array.isArray(parsed))throw new Error('Stored value must be an array');
    return parsed;
  }catch(error){
    console.error(`Could not read ${key} from browser storage:`,error);
    return [];
  }
}
function persistArray(key,value){
  try{
    localStorage.setItem(key,JSON.stringify(value));
  }catch(error){
    console.error(`Could not persist ${key} to browser storage:`,error);
    toast.error('Your browser could not save this update.');
  }
}
export function StoreProvider({children}){
  const [cart,setCart]=useState(()=>readStoredArray('ms_cart'));
  const [wish,setWish]=useState(()=>readStoredArray('ms_wish'));
  const [orders,setOrders]=useState(()=>readStoredArray('ms_orders'));
  const [addrs,setAddrs]=useState(()=>readStoredArray('ms_addr'));
  useEffect(()=>persistArray('ms_cart',cart),[cart]);
  useEffect(()=>persistArray('ms_wish',wish),[wish]);
  useEffect(()=>persistArray('ms_orders',orders),[orders]);
  useEffect(()=>persistArray('ms_addr',addrs),[addrs]);
  const addCart=(p,quantity=1)=>{
    if(p.stock!==undefined&&Number(p.stock)<=0){toast.error('This item is currently out of stock.');return;}
    const count=Math.max(1,Math.floor(Number(quantity)||1));
    setCart(c=>Array.from({length:count}).reduce(previous=>addCartItem(previous,p),c));
    notifyCartAdded(p.name,count);
  };
  const toggleWish=p=>{setWish(w=>w.find(x=>x._id===p._id)?w.filter(x=>x._id!==p._id):[...w,p]);};
  const moveToCart=p=>{if(p.stock!==undefined&&Number(p.stock)<=0){toast.error('This item is currently out of stock.');return;}setCart(c=>addCartItem(c,p));setWish(w=>w.filter(x=>x._id!==p._id));};
  const moveToWishlist=p=>{setWish(w=>w.some(x=>x._id===p._id)?w:[p,...w]);setCart(c=>{const index=c.findIndex(x=>x._id===p._id);return index<0?c:c.filter((_,i)=>i!==index)});};
  const placeOrder=(items,addr)=>{const order={id:'MS-'+Date.now().toString().slice(-6),items,date:new Date().toLocaleString('en-IN'),status:'Confirmed',addr};setOrders(previous=>[order,...previous]);setCart([]);return order;};
  const returnOrder=(id,reason)=>{setOrders(o=>o.map(x=>x.id===id?{...x,status:'Return Requested: '+reason}:x));toast.success('Return request submitted successfully.');};
  return <Ctx.Provider value={{cart,setCart,addCart,wish,toggleWish,moveToCart,moveToWishlist,orders,placeOrder,returnOrder,addrs,setAddrs}}>{children}</Ctx.Provider>;
}
