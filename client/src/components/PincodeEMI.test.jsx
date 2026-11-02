import {fireEvent,render,screen} from '@testing-library/react';
import {describe,expect,it} from 'vitest';
import PincodeEMI from './PincodeEMI.jsx';

describe('PincodeEMI',()=>{
  it('renders the no-cost monthly EMI for eligible prices',()=>{
    render(<PincodeEMI price={12000}/>);
    expect(screen.getByText(/EMI: ₹1,000\/month x 12/)).toBeInTheDocument();
  });
  it('checks and displays a six-digit delivery pin',()=>{
    render(<PincodeEMI price={5000}/>);
    fireEvent.change(screen.getByPlaceholderText(/Pincode/),{target:{value:'700001'}});
    fireEvent.click(screen.getByRole('button',{name:/Check/}));
    expect(screen.getByText(/Delivery to 700001/)).toBeInTheDocument();
  });
});
