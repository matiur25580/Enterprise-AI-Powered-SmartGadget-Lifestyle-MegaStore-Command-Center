import Shop from './Shop.jsx';import Loyalty from '../../components/Loyalty.jsx';import SupportChat from '../../components/SupportChat.jsx';import Invoice from '../../components/Invoice.jsx';
export default function ShopWrapper(){
  return (<div><Loyalty/><Shop/><div style={{padding:'0 20px'}}><Invoice/></div><SupportChat/></div>);
}
