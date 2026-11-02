import {describe,expect,it} from 'vitest';
import {getDiscount,getListPrice} from './ProductCard.jsx';

describe('product card pricing',()=>{
  it('uses the real MRP for the discount when one is available',()=>{
    const product={_id:'phone',price:650,mrp:1000};

    expect(getDiscount(product)).toBe(35);
    expect(getListPrice(product)).toBe(1000);
  });

  it('uses a stable discount tier when MRP is absent',()=>{
    const product={_id:'phone-123',price:1000};
    const discount=getDiscount(product);

    expect([10,25,40]).toContain(discount);
    expect(getDiscount(product)).toBe(discount);
    expect(getListPrice(product)).toBe(Math.round(1000/(1-discount/100)));
  });
});
