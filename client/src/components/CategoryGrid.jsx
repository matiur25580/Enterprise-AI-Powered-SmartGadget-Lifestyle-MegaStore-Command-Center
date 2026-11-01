import {useState} from 'react';
const cats=[
 {name:'📱 Mobiles',items:['Button Phone','Android Phone','iPhone'],color:'#e3f2fd'},
 {name:'🎧 Audio & Power',items:['Earbuds','Charger','Cable','Adapter'],color:'#f3e5f5'},
 {name:'💾 Storage',items:['Pendrive','Memory Card'],color:'#e8f5e9'},
 {name:'💻 Computing',items:['Laptop','Laptop Charger','Accessories'],color:'#fff3e0'},
 {name:'🕶️ Lifestyle',items:['Sunglasses','Eye Glasses','Belt'],color:'#fce4ec'},
];
export default function CategoryGrid({onSelect}){
  const [active,setActive]=useState(null);
  return (<div style={{padding:15,fontFamily:'sans-serif'}}>
    <h3>🗂️ Shop by Category - Customer easily khuje pabe</h3>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:10}}>
      {cats.map((c,i)=><div key={i} onClick={()=>{setActive(c.name);onSelect&&onSelect(c.items[0])}} style={{background:c.color,padding:15,borderRadius:10,cursor:'pointer',border:active===c.name?'2px solid #2a5298':'2px solid transparent',textAlign:'center'}}>
        <div style={{fontSize:24}}>{c.name.split(' ')[0]}</div><b style={{fontSize:13}}>{c.name}</b><div style={{fontSize:11,opacity:.7}}>{c.items.join(' • ')}</div>
      </div>)}
    </div>
  </div>);
}
