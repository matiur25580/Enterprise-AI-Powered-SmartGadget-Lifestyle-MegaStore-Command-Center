export default function SmartSearch({onSearch}){
  const fix=(q)=>{const m={iphon:'iphone',samsang:'samsung',laptap:'laptop',airpod:'earbuds'};let s=q.toLowerCase();for(let k in m){if(s.includes(k)) s=s.replace(k,m[k])}return s};
  return (<input placeholder="Search... (typo ok: iphon)" onChange={e=>onSearch&&onSearch(fix(e.target.value))} style={{padding:10,borderRadius:8,border:'1px solid #ccc',width:'100%'}}/>);
}
