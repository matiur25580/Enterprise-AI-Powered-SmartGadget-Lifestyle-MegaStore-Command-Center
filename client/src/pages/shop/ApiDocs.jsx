import {Link} from 'react-router-dom';
const apis=[['POST','/api/auth/send-otp','OTP pathay'],['POST','/api/auth/register','Register + Unique ID'],['POST','/api/auth/login','JWT login'],['POST','/api/auth/forgot-password','Reset OTP'],['GET','/api/product/all?search=&category=&sort=','Product list + pagination'],['GET','/api/product/combo/:id','AI Perfect Combo'],['POST','/api/order/create','Order place'],['GET','/api/extra/analytics/summary','Admin stats']];
export default function ApiDocs(){
  return (<div style={{padding:20,maxWidth:800,margin:'0 auto',fontFamily:'monospace'}}>
    <Link to="/">← Home</Link><h2>📚 API Documentation</h2><p>Base: <code>http://localhost:10000</code></p>
    {apis.map((a,i)=><div key={i} style={{background:'#f5f5f5',padding:10,borderRadius:8,margin:'8px 0'}}><span style={{background:a[0]==='GET'?'#4caf50':'#2196f3',color:'#fff',padding:'2px 8px',borderRadius:4,fontSize:12}}>{a[0]}</span> <b>{a[1]}</b><br/><small>{a[2]}</small></div>)}
    <div style={{background:'#e8f5e9',padding:10,borderRadius:8,marginTop:10}}>✓ JWT: Authorization: Bearer &lt;token&gt; | ✓ RBAC: 6 roles</div>
  </div>);
}
