import {Link} from 'react-router-dom';
export default function Terms(){
  return (<div style={{padding:30,maxWidth:800,margin:'0 auto',fontFamily:'sans-serif'}}>
    <Link to="/">← Home</Link><h2>📜 Terms & Conditions</h2>
    {[['1. Returns','7-day easy return on all products.'],['2. Warranty','1-year brand warranty on electronics.'],['3. Delivery','Free delivery over ₹499, 3-5 days.'],['4. Payment','UPI, Card, COD, EMI available.'],['5. Privacy','Your data is encrypted and safe.']].map((x,i)=><div key={i} style={{background:'#f8f9fa',padding:12,borderRadius:8,margin:'8px 0'}}><b>{x[0]}</b><p style={{fontSize:14}}>{x[1]}</p></div>)}
    <div style={{background:'#e8f5e9',padding:12,borderRadius:8,marginTop:15}}>✓ By shopping you agree to these terms</div>
  </div>);
}
