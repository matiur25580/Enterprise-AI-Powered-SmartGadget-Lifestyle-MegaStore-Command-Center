import {Component} from 'react';
import {Link,useLocation} from 'react-router-dom';

class Boundary extends Component {
  state={hasError:false};

  static getDerivedStateFromError(){
    return {hasError:true};
  }

  componentDidCatch(error,info){
    console.error('Route rendering failed:',error,info);
  }

  render(){
    if(this.state.hasError){
      return (
        <main role="alert" style={{minHeight:'50vh',display:'grid',placeContent:'center',gap:12,padding:24,background:'#060606',color:'#e6edf3',textAlign:'center'}}>
          <h1 style={{margin:0}}>This page hit a problem</h1>
          <p style={{color:'#b7c0c8'}}>The rest of MegaStore is still available.</p>
          <Link to="/" style={{justifySelf:'center',padding:'10px 16px',borderRadius:6,background:'#00e676',color:'#060606',fontWeight:700,textDecoration:'none'}}>Return to home</Link>
        </main>
      );
    }
    return this.props.children;
  }
}

export default function RouteErrorBoundary({children}){
  const {pathname}=useLocation();
  return <Boundary key={pathname}>{children}</Boundary>;
}
