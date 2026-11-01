export default function ArchDiagram(){
  const box={
    background:'#212122',
    border:'1px solid #353839',
    borderRadius:8,
    padding:'8px 12px',
    margin:'6px auto',
    maxWidth:260,
    textAlign:'center',
    fontWeight:'bold',
    fontSize:13
  };
  const arrow={
    textAlign:'center',
    color:'#58a6ff',
    fontSize:18
  };
  const wrap={
    background:'#060606',
    border:'1px solid #353839',
    borderRadius:12,
    padding:15,
    marginTop:12
  };
  const tag={
    fontSize:12,
    color:'#8b949e',
    background:'#212122',
    border:'1px solid #353839',
    borderRadius:12,
    padding:'4px 10px'
  };
  const b1=Object.assign({},
    box,{color:'#58a6ff'});
  const b2=Object.assign({},
    box,{color:'#3fb950'});
  const b3=Object.assign({},
    box,{color:'#e6edf3'});
  return (
    <div style={wrap}>
      <h4 style={{color:'#e6edf3',
        margin:'0 0 8px'}}>
        System Architecture
      </h4>
      <div style={b1}>
        Vercel Client (React)
      </div>
      <div style={arrow}>v</div>
      <div style={b2}>
        Render API (Express)
      </div>
      <div style={arrow}>v</div>
      <div style={b3}>
        MongoDB Atlas
      </div>
      <div style={{display:'flex',
        gap:8,
        justifyContent:'center',
        marginTop:10,
        flexWrap:'wrap'}}>
        <span style={tag}>JWT + RBAC</span>
        <span style={tag}>Razorpay</span>
        <span style={tag}>Gmail OTP</span>
        <span style={tag}>Multer Uploads</span>
      </div>
      <p style={{color:'#8b949e',
        fontSize:12}}>
        MERN stack - 6 roles,
        real DB, real payments.
      </p>
    </div>
  );
}
