import ArchDiagram from './ArchDiagram.jsx';
import DemoVideo from './DemoVideo.jsx';
import PerfBadge from './PerfBadge.jsx';
export default function HrExtra(){
  return (<div style={{marginTop:20}}>
    <ArchDiagram/>
    <DemoVideo/>
    <PerfBadge/>
  </div>);
}
