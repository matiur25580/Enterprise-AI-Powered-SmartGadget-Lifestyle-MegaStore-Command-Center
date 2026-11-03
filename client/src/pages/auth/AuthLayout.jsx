import {useState,useEffect} from 'react';import {Link} from 'react-router-dom';
import {toast} from '../../utils/notifications.jsx';
export function useThemeDate(){
  const [dark,setDark]=useState(false);const [now,setNow]=useState(new Date());
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t)},[]);
  const dd=String(now.getDate()).padStart(2,'0');const mm=String(now.getMonth()+1).padStart(2,'0');
  const h12=now.getHours()%12||12;const ap=now.getHours()>=12?'PM':'AM';
  const date=`${dd}.${mm}.${now.getFullYear()}`;
  const time=`${String(h12).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')} ${ap}`;
  return {dark,setDark,date,time};
}
export function showSuccess(msg){toast.success(msg)}
export function showError(msg){toast.error(msg)}
export const inputStyle=(dark)=>({width:'100%',padding:12,margin:'8px 0',borderRadius:8,border:'1px solid #ccc',boxSizing:'border-box',background:dark?'#2a2a2a':'#fff',color:dark?'#fff':'#000'});
