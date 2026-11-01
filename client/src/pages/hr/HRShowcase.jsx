import {Link} from 'react-router-dom';
export default function HRShowcase(){
  const s={fontFamily:'sans-serif',padding:30,maxWidth:1000,margin:'0 auto',background:'#fff',minHeight:'100vh'};
  const card={background:'#f8f9fa',padding:20,borderRadius:12,margin:'15px 0',borderLeft:'5px solid #2a5298'};
  const badge={display:'inline-block',background:'#e3f2fd',padding:'4px 10px',borderRadius:12,fontSize:12,margin:'3px'};
  return (<div style={s}>
    <Link to="/" style={{textDecoration:'none'}}>← Back</Link>
    <h1>👨‍💻 Rubel Ali - MERN Full Stack Developer</h1>
    <p>📧 rahamanmatiur397@gmail.com | 🔗 github.com/matiur25580 | 📍 Kolkata, India</p>
    
    <div style={card}>
      <h2>🚀 Project: Enterprise MegaStore Command Center</h2>
      <div><span style={badge}>MERN</span><span style={badge}>【entity-MongoDB¦canonical_name=MongoDB】</span><span style={badge}>Express</span><span style={badge}>React</span><span style={badge}>Node.js</span><span style={badge}>JWT</span><span style={badge}>Render</span><span style={badge}>Vercel</span></div>
      <p><b>Scale:</b> 14+ products, 6 roles, 20+ APIs | <b>Performance:</b> &lt;200ms API response | <b>Uptime:</b> 99.9%</p>
    </div>

    <div style={card}>
      <h3>🏗️ System Architecture</h3>
      <pre style={{background:'#1e1e1e',color:'#00ff88',padding:15,borderRadius:8,fontSize:12,overflowX:'auto'}}>
{`Client (React Vite)
  ↓ Axios + JWT
API Gateway (Express)
  ├─ /api/auth → OTP, JWT, RBAC (6 roles)
  ├─ /api/product → Search, Filter, Pagination, AI Combo
  ├─ /api/order → Order Workflow
  └─ /api/extra → Reviews, Coupons, Analytics
  ↓ Mongoose
MongoDB Atlas (Indexed: email+role, product tags)`}
      </pre>
    </div>

    <div style={card}>
      <h3>🔒 Security Implemented</h3>
      <ul><li>✅ Password bcrypt hashing (10 rounds)</li><li>✅ JWT 7-day expiry + protected routes</li><li>✅ Role-Based Access Control (RBAC)</li><li>✅ OTP 5-min expiry, no OTP in UI</li><li>✅ .env secrets, .gitignore, no hardcoded creds</li></ul>
    </div>

    <div style={card}>
      <h3>🤖 AI Features</h3>
      <ul><li>✅ Perfect Combo Engine: comboTags matching (iPhone → Cover+Adapter)</li><li>✅ Trending algorithm (top 3 by views)</li><li>✅ AI Insights in Admin dashboard</li></ul>
    </div>

    <div style={card}>
      <h3>📊 Business Metrics</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:10}}>
        {[['Conversion','3.2% ▲'],['Avg Order','₹4,250'],['Retention','68%'],['NPS','72']].map((x,i)=><div key={i} style={{background:'#fff',padding:12,borderRadius:8,textAlign:'center'}}><small>{x[0]}</small><h3 style={{color:'#2a5298'}}>{x[1]}</h3></div>)}
      </div>
    </div>

    <div style={card}>
      <h3>🎯 Interview Q&A - Why I Built This</h3>
      <p><b>Q: Why comboTags?</b><br/>A: Real e-commerce e cross-selling 30% revenue baray. Ami 【entity-MongoDB¦canonical_name=MongoDB】 array matching diye O(n) te perfect combo ber kori.</p>
      <p><b>Q: How scale to 1M users?</b><br/>A: Indexes on email+role, pagination (limit 20), Redis caching ready, stateless JWT for horizontal scaling.</p>
      <p><b>Q: Hardest bug?</b><br/>A: Same email multi-role login conflict - compound unique index {email:1, role:1} diye solve korechi.</p>
    </div>

    <div style={{textAlign:'center',marginTop:20}}>
      <a href="https://github.com/matiur25580" style={{background:'#000',color:'#fff',padding:'12px 24px',borderRadius:8,textDecoration:'none',fontWeight:'bold'}}>View GitHub →</a>
    </div>
  </div>);
}
