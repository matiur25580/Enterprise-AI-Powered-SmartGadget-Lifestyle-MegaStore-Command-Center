import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import RouteErrorBoundary from './RouteErrorBoundary.jsx';

function CrashingRoute(){
  throw new Error('component failure');
}

describe('RouteErrorBoundary',()=>{
  afterEach(()=>cleanup());

  it('renders a recovery screen when a route component throws',()=>{
    const consoleError=vi.spyOn(console,'error').mockImplementation(()=>{});
    render(<MemoryRouter><RouteErrorBoundary><CrashingRoute/></RouteErrorBoundary></MemoryRouter>);
    expect(screen.getByRole('alert')).toHaveTextContent('This page hit a problem');
    expect(screen.getByRole('link',{name:'Return to home'})).toHaveAttribute('href','/');
    consoleError.mockRestore();
  });
});
