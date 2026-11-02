import { useState } from 'react';
import {calculateEmi} from '../utils/commerce.js';
const EMI_KEYS = ['iphone', 'android phone', 'laptop', 'desktop', 'tablet', 'galaxy tab'];
export default function PaymentBox(props) {
  const total = props.total || 5000;
  const productName = props.productName || 'iPhone 15';
  const [m, setM] = useState('COD');
  const [done, setDone] = useState(false);
  const [months, setMonths] = useState(12);
  const low = productName.toLowerCase();
  let eligible = total >= 15000;
  for (let k of EMI_KEYS) { if (low.includes(k)) { eligible = true; break; } }
  const {total:emiTotal,monthly:emiPer,interest:extra} = calculateEmi(total,months);
  const payable = m === 'EMI' ? emiTotal : total;
  const payStr = String(payable);
  function pay() {
    setDone(true);
    alert('Payment successful via ' + m + '. Order confirmed');
  }
  if (done) {
    return (
      <div style={{ background: '#e8f5e9', padding: 20, borderRadius: 10, textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>OK</div>
        <h3>Order Placed!</h3>
        <p>Paid via {m}</p>
      </div>
    );
  }
  return (
    <div style={{ background: '#fff', padding: 15, borderRadius: 10, border: '1px solid #ddd' }}>
      <h3>Payment - {productName}</h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        <button onClick={() => setM('UPI')} style={{ padding: '8px 14px', borderRadius: 8 }}>UPI</button>
        <button onClick={() => setM('Card')} style={{ padding: '8px 14px', borderRadius: 8 }}>Card</button>
        {eligible ? <button onClick={() => setM('EMI')} style={{ padding: '8px 14px', borderRadius: 8 }}>EMI</button> : null}
        <button onClick={() => setM('COD')} style={{ padding: '8px 14px', borderRadius: 8 }}>COD</button>
      </div>
      {m === 'EMI' && eligible ? (
        <div style={{ background: '#fff3e0', padding: 12, borderRadius: 8 }}>
          <b>EMI Plan (8 percent interest)</b>
          <div style={{ marginTop: 6 }}>
            <select value={months} onChange={(e) => setMonths(Number(e.target.value))}>
              <option value={3}>3 months</option>
              <option value={6}>6 months</option>
              <option value={9}>9 months</option>
              <option value={12}>1 year</option>
              <option value={24}>2 years max</option>
            </select>
          </div>
          <div style={{ marginTop: 8 }}>
            <div>Product price: {total}</div>
            <div>Interest: {extra}</div>
            <div><b>Total: {emiTotal}</b></div>
            <div>Per month: {emiPer} x {months}</div>
          </div>
        </div>
      ) : null}
      <div style={{ marginTop: 10, fontWeight: 'bold', fontSize: 18 }}>Payable amount: {payStr}</div>
      <button onClick={pay} style={{ width: '100%', padding: 12, background: '#00c853', color: '#fff', border: 'none', borderRadius: 8, marginTop: 8, fontWeight: 'bold' }}>
        Place Order - {m}
      </button>
    </div>
  );
}
