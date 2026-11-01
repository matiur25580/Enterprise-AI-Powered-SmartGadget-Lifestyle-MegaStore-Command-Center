import {useState,useEffect} from 'react';
export default function LiveMap(){
  const [pos,setPos]=useState(5);
  useEffect(()=>{
    const t=setInterval(()=>{
      setPos(function(p){
        if(p>=88){return 5;}
        return p+4;
      });
    },700);
    return function(){clearInterval(t);};
  },[]);
  const card={
    background:'#212122',
    border:'1px solid #353839',
    borderRadius:12,
    padding:12,
    marginTop:10,
    color:'#e6edf3'
  };
  const track={
    position:'relative',
    height:60,
    background:'#060606',
    borderRadius:8,
    border:'1px solid #353839',
    marginTop:8
  };
  const rail={
    position:'absolute',
    top:28,left:14,right:14,
    height:4,
    background:'#353839',
    borderRadius:2
  };
  const rider={
    position:'absolute',
    top:20,
    width:20,height:20,
    borderRadius:10,
    background:'#238636',
    border:'2px solid #fff',
    left:pos+'%',
    marginLeft:-10
  };
  const lab={
    position:'absolute',
    top:42,
    fontSize:11,
    color:'#8b949e'
  };
  return (
    <div style={card}>
      <b>Live Delivery Map</b>
      <div style={track}>
        <div style={rail} />
        <div style={rider} />
        <span style={Object.assign(
          {},lab,{left:10})}>
          Warehouse
        </span>
        <span style={Object.assign(
          {},lab,{right:10})}>
          You
        </span>
      </div>
      <div style={{fontSize:12,
        color:'#8b949e',
        marginTop:6}}>
        Rider 2km away - arriving soon
      </div>
    </div>
  );
}
