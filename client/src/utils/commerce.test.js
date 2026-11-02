import {describe,expect,it} from 'vitest';
import {addCartItem,calculateCartTotal,calculateCouponDiscount,calculateEmi} from './commerce.js';

describe('cart calculations',()=>{
  it('returns zero for an empty cart',()=>expect(calculateCartTotal([])).toBe(0));
  it('adds product prices into the cart total',()=>expect(calculateCartTotal([{price:12.5},{price:30}])).toBe(42.5));
  it('treats missing or invalid prices as zero',()=>expect(calculateCartTotal([{price:null},{price:'invalid'}])).toBe(0));
  it('appends a product without mutating the old cart',()=>{
    const cart=[{_id:'a',price:10}], product={_id:'b',price:20};
    expect(addCartItem(cart,product)).toEqual([...cart,product]);
    expect(cart).toHaveLength(1);
  });
  it('preserves duplicate additions as separate cart entries',()=>{
    const product={_id:'a',price:10};
    expect(addCartItem([product],product)).toEqual([product,product]);
  });
});

describe('EMI calculation',()=>{
  it('applies the existing 8 percent interest',()=>expect(calculateEmi(10000)).toEqual({total:10800,monthly:900,interest:800}));
  it('supports selected repayment durations',()=>expect(calculateEmi(12000,6).monthly).toBe(2160));
  it('rounds total and installment to whole currency units',()=>expect(calculateEmi(10001,3)).toEqual({total:10801,monthly:3600,interest:800}));
  it('supports zero-interest EMI',()=>expect(calculateEmi(12000,12,0).monthly).toBe(1000));
  it('returns zero amounts for invalid principal values',()=>expect(calculateEmi('invalid')).toEqual({total:0,monthly:0,interest:0}));
});

describe('coupon discount calculation',()=>{
  it('calculates a percentage discount in currency units',()=>expect(calculateCouponDiscount(2500,10)).toBe(250));
  it('rounds fractional discounts to the nearest currency unit',()=>expect(calculateCouponDiscount(99,15)).toBe(15));
  it('clamps discounts to the 0-100 percent range',()=>{
    expect(calculateCouponDiscount(100,150)).toBe(100);
    expect(calculateCouponDiscount(100,-10)).toBe(0);
  });
});
