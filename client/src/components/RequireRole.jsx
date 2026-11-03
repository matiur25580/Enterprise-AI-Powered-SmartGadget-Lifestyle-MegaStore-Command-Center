import {Navigate,useLocation} from 'react-router-dom';

export default function RequireRole({role,children}){
  const location=useLocation();
  let session;
  try{
    session=JSON.parse(localStorage.getItem('ms_auth')||'null');
  }catch{
    session=null;
  }
  if(!session?.token)return <Navigate to="/login" replace state={{from:location.pathname}}/>;
  if(session.role!==role)return <Navigate to="/shop" replace/>;
  return children;
}
