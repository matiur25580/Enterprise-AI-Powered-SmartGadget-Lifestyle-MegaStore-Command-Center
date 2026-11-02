import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';

export {toast};

export function notifyInfo(message){
  return toast(message,{icon:'ℹ',style:{borderLeft:'4px solid #2563eb'}});
}

export function notifyCartAdded(productName,count=1){
  const message=count>1?`Added ${count} × ${productName} to your cart.`:`Added ${productName} to your cart.`;
  return toast.custom(t=><div className={`app-toast-card${t.visible?' app-toast-visible':''}`} role="status">
    <span className="app-toast-status app-toast-status-success" aria-hidden="true">✓</span>
    <span className="app-toast-message">{message}</span>
    <Link className="app-toast-action" to="/checkout" onClick={()=>toast.dismiss(t.id)}>View Cart →</Link>
  </div>,{duration:3000});
}
