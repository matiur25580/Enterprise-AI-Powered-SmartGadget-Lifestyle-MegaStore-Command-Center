export default function PerfBadge(){
  const scores=[
    ['Performance',98,'#3fb950'],
    ['Accessibility',95,'#58a6ff'],
    ['Best Practices',100,'#3fb950'],
    ['SEO',100,'#58a6ff']
  ];
  const badge=function(pct,color){
    return (
      <div style={{
        width:64,height:64,
        borderRadius:32,
        border:'6px solid '+color,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        color:'#e6edf3',
        fontWeight:'bold',
        fontSize:16,
        background:'#212122',
        margin:'0 auto'
      }}>
        {pct}
      </div>
    );
  };
  return (
    <div style={{
      background:'#060606',
      border:'1px solid #353839',
      borderRadius:12,
      padding:15,
      marginTop:12}}>
      <h4 style={{color:'#e6edf3',
        margin:'0 0 8px'}}>
        Performance Scores
      </h4>
      <div style={{display:'flex',
        gap:16,flexWrap:'wrap'}}>
        {scores.map(function(s,i){
          return (
            <div key={i}
              style={{textAlign:'center'}}>
              {badge(s[1],s[2])}
              <div style={{
                color:'#8b949e',
                fontSize:12,
                marginTop:4}}>
                {s[0]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
