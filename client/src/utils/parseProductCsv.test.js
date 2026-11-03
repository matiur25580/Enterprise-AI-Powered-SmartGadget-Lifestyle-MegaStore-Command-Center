import {describe,expect,it} from 'vitest';
import {parseProductCsv} from './parseProductCsv.js';

describe('parseProductCsv',()=>{
  it('parses quoted commas and normalizes product values',()=>{
    expect(parseProductCsv('name,category,price,stock,mrp,brand\r\n"Phone, Blue",Mobile,1200,5,1500,Acme')).toEqual([
      {name:'Phone, Blue',category:'Mobile',price:1200,stock:5,mrp:1500,brand:'Acme'},
    ]);
  });

  it('rejects missing required columns and malformed rows',()=>{
    expect(()=>parseProductCsv('name,category,price\nPhone,Mobile,10')).toThrow('Missing required columns: stock.');
    expect(()=>parseProductCsv('name,category,price,stock\nPhone,Mobile,10,nope')).toThrow('Invalid product data on CSV row 2.');
    expect(()=>parseProductCsv('name,category,price,stock,mrp\nPhone,Mobile,100,1,90')).toThrow('Invalid product data on CSV row 2.');
    expect(()=>parseProductCsv('name,category,price,stock\nPhone,Electronics,100,1')).toThrow('Invalid product data on CSV row 2.');
    expect(()=>parseProductCsv('name,category,price,stock\n"Phone,Mobile,10,1')).toThrow('unclosed quoted field');
  });

  it('caps each import at 100 products',()=>{
    const rows=['name,category,price,stock',...Array.from({length:101},(_,index)=>`Product ${index},Mobile,10,1`)].join('\n');
    expect(()=>parseProductCsv(rows)).toThrow('Import up to 100 products per CSV file.');
  });
});
