import {renderHook,act} from '@testing-library/react';
import {beforeEach,describe,expect,it,vi} from 'vitest';
import {toast} from 'react-hot-toast';
import {StoreProvider,useStore} from './StoreContext.jsx';

const wrapper=({children})=><StoreProvider>{children}</StoreProvider>;

describe('StoreContext cart and order logic',()=>{
  beforeEach(()=>{
    localStorage.clear();
  });

  it('adds products to the cart and persists them',()=>{
    const product={_id:'phone',name:'Phone',price:100};
    const {result}=renderHook(()=>useStore(),{wrapper});

    act(()=>result.current.addCart(product));

    expect(result.current.cart).toEqual([product]);
    expect(JSON.parse(localStorage.getItem('ms_cart'))).toEqual([product]);
  });

  it('adds the selected quantity as individual cart items',()=>{
    const product={_id:'phone',name:'Phone',price:100};
    const {result}=renderHook(()=>useStore(),{wrapper});

    act(()=>result.current.addCart(product,3));

    expect(result.current.cart).toEqual([product,product,product]);
  });

  it('does not add out-of-stock products and shows an error toast',()=>{
    const product={_id:'phone',name:'Phone',price:100,stock:0};
    const showError=vi.spyOn(toast,'error').mockImplementation(()=>undefined);
    const {result}=renderHook(()=>useStore(),{wrapper});

    act(()=>result.current.addCart(product));

    expect(result.current.cart).toEqual([]);
    expect(showError).toHaveBeenCalledWith('This item is currently out of stock.');
    showError.mockRestore();
  });

  it('moves a wishlist product into the cart',()=>{
    const product={_id:'phone',name:'Phone',price:100};
    localStorage.setItem('ms_wish',JSON.stringify([product]));
    const {result}=renderHook(()=>useStore(),{wrapper});

    act(()=>result.current.moveToCart(product));

    expect(result.current.cart).toEqual([product]);
    expect(result.current.wish).toEqual([]);
  });

  it('moves a cart product to the wishlist without duplicating it',()=>{
    const product={_id:'phone',name:'Phone',price:100};
    localStorage.setItem('ms_cart',JSON.stringify([product]));
    localStorage.setItem('ms_wish',JSON.stringify([product]));
    const {result}=renderHook(()=>useStore(),{wrapper});

    act(()=>result.current.moveToWishlist(product));

    expect(result.current.cart).toEqual([]);
    expect(result.current.wish).toEqual([product]);
  });

  it('places an order, records it, and clears the cart',()=>{
    const product={_id:'phone',name:'Phone',price:100};
    localStorage.setItem('ms_cart',JSON.stringify([product]));
    const {result}=renderHook(()=>useStore(),{wrapper});
    let order;

    act(()=>{order=result.current.placeOrder([product],'Home');});

    expect(order).toMatchObject({items:[product],addr:'Home',status:'Confirmed'});
    expect(result.current.orders).toEqual([order]);
    expect(result.current.cart).toEqual([]);
  });
});
