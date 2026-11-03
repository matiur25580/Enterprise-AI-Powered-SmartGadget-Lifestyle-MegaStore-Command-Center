const REQUIRED_COLUMNS=['name','category','price','stock'];
const CATEGORIES=new Set(['Mobile','AudioPower','Protection','Storage','Computing','Lifestyle']);

export function parseProductCsv(text){
  const rows=[];
  let row=[];
  let cell='';
  let quoted=false;

  for(let index=0;index<text.length;index++){
    const character=text[index];
    if(character==='"'){
      if(quoted&&text[index+1]==='"'){
        cell+='"';
        index++;
      }else{
        quoted=!quoted;
      }
    }else if(character===','&&!quoted){
      row.push(cell.trim());
      cell='';
    }else if((character==='\n'||character==='\r')&&!quoted){
      if(character==='\r'&&text[index+1]==='\n')index++;
      row.push(cell.trim());
      if(row.some(value=>value!==''))rows.push(row);
      row=[];
      cell='';
    }else{
      cell+=character;
    }
  }
  if(quoted)throw new Error('The CSV contains an unclosed quoted field.');
  row.push(cell.trim());
  if(row.some(value=>value!==''))rows.push(row);
  if(rows.length<2)throw new Error('Add a header row and at least one product.');
  if(rows.length>101)throw new Error('Import up to 100 products per CSV file.');

  const headers=rows[0].map(value=>value.toLowerCase());
  const missing=REQUIRED_COLUMNS.filter(column=>!headers.includes(column));
  if(missing.length)throw new Error(`Missing required columns: ${missing.join(', ')}.`);

  return rows.slice(1).map((values,index)=>{
    const record=Object.fromEntries(headers.map((header,column)=>[header,values[column]||'']));
    const price=Number(record.price);
    const stock=Number(record.stock);
    const mrp=record.mrp?Number(record.mrp):undefined;
    if(!record.name||!CATEGORIES.has(record.category)||!Number.isFinite(price)||price<0||!Number.isInteger(stock)||stock<0||(mrp!==undefined&&(!Number.isFinite(mrp)||mrp<price))){
      throw new Error(`Invalid product data on CSV row ${index+2}.`);
    }
    return {
      name:record.name,
      category:record.category,
      price,
      stock,
      ...(mrp!==undefined?{mrp}:{}),
      ...(record.brand?{brand:record.brand}:{}),
    };
  });
}
