import {useState} from 'react';
import {toast} from '../utils/notifications.jsx';
export default function RazorpayPay({amount=5000}){
  const [done,setDone]=useState(false);
  const pay=()=>{
    if(!window.Razorpay){
      const s=document.createElement('script');s.src='https://checkout.razorpay.com/v1/checkout.js';
      const loadingToast=toast.loading('Connecting to secure checkout…');
      s.onload=()=>{toast.dismiss(loadingToast);openRzp();};
      s.onerror=()=>toast.error('Payment could not be started. Please try again.',{id:loadingToast});
      document.body.appendChild(s);
    } else openRzp();
  };
  const openRzp=()=>{
    const rzp=new window.【entity-Razorpay¦canonical_name=Razorpay】({
      key:'rzp_test_1DP5mmOlF5G5ag',
      amount:amount*100,currency:'INR',name:'MegaStore',description:'Test Order',
      handler:()=>{setDone(true);toast.success('Payment successful. Your order is confirmed.')},
      prefill:{email:'test@test.com',contact:'9876543210'},theme:{color:'#2a5298'}
    });
    rzp.on('payment.failed',()=>toast.error('Payment couldn’t be completed. Please try again.'));
    rzp.open();
  };
  if(done) return (<div style={{background:'#e8f5e9',padding:15,borderRadius:10,textAlign:'center'}}>Payment Successful via Razorpay Test</div>);
  return (<div style={{background:'#fff',padding:12,borderRadius:10,border:'1px solid #ddd',marginTop:10}}>
    <b>💳 Razorpay (Test Mode)</b><br/><small>Test card: 4111 1111 1111 1111</small><br/>
    <button onClick={pay} style={{marginTop:8,padding:'10px 20px',background:'#2a5298',color:'#fff',border:'none',borderRadius:8,fontWeight:'bold'}}>Pay Rs.{amount.toLocaleString('en-IN')} with Razorpay</button>
  </div>);
}
