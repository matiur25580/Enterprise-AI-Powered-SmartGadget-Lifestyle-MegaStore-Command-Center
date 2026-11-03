import {describe,expect,it} from 'vitest';
import {getDiscount,getListPrice} from './ProductCard.jsx';

describe('product card pricing',()=>{
  it('uses the real MRP for the discount when one is available',()=>{
    const product={_id:'phone',price:650,mrp:1000};

    expect(getDiscount(product)).toBe(35);
    expect(getListPrice(product)).toBe(1000);
  });

  it('does not invent a discount when MRP is absent',()=>{
    const product={_id:'phone-123',price:1000};

    expect(getDiscount(product)).toBe(0);
    expect(getListPrice(product)).toBe(1000);
  });
});
