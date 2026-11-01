import {useState} from 'react';
const DEMO=[{name:'iPhone 15',price:66999,rating:4.6,battery:'3349mAh',camera:'48MP',chip:'A16'},{name:'Galaxy S24',price:49999,rating:4.5,battery:'4000mAh',camera:'50MP',chip:'Snapdragon 8'}];
export default function Compare(){
  return (<div style={{background:'#fff',padding:15,borderRadius:10,marginTop:15}}>
    <h3>Compare Products</h3>
    <table style={{width:'100%',fontSize:13,borderCollapse:'collapse'}}>
      <thead><tr><th style={{textAlign:'left',padding:8}}>Feature</th>{DEMO.map((p,i)=><th key={i}>{p.name}</th>)}</tr></thead>
      <tbody>
        <tr style={{borderTop:'1px solid #eee'}}><td style={{padding:8,fontWeight:'bold'}}>Price</td><td style={{textAlign:'center'}}>Rs.66999</td><td style={{textAlign:'center'}}>Rs.49999</td></tr>
        <tr style={{borderTop:'1px solid #eee'}}><td style={{padding:8,fontWeight:'bold'}}>Rating</td><td style={{textAlign:'center'}}>4.6 star</td><td style={{textAlign:'center'}}>4.5 star</td></tr>
        <tr style={{borderTop:'1px solid #eee'}}><td style={{padding:8,fontWeight:'bold'}}>Battery</td><td style={{textAlign:'center'}}>3349mAh</td><td style={{textAlign:'center'}}>4000mAh</td></tr>
      </tbody>
    </table>
    <div style={{marginTop:8,background:'#e8f5e9',padding:8,borderRadius:6,fontSize:13}}>Winner: Galaxy S24 - Rs.17000 sosta</div>
  </div>);
}
