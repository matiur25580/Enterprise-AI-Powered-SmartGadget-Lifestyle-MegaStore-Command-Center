const mongoose=require('mongoose');
const Product=require('./src/models/Product');
const MONGO_URI=process.env.MONGO_URI;
if(!MONGO_URI){console.error('MONGO_URI env missing!');process.exit(1);}
const P=(name,category,subcategory,price,brand,comboTags,rating,stock)=>({name,category,subcategory,price,brand,comboTags,rating,stock:stock||50,image:''});
const products=[
P('iPhone 15 (128GB, Blue)','Mobile','iPhone',79900,'Apple',['iphone','cover','charger'],4.8),
P('Samsung Galaxy S24 5G','Mobile','Android Phone',62999,'Samsung',['samsung','cover','charger'],4.7),
P('Redmi Note 13 5G','Mobile','Android Phone',17999,'Xiaomi',['xiaomi','cover','tempered glass'],4.5),
P('Nokia 105 Classic Button Phone','Mobile','Button Phone',1299,'Nokia',['nokia','charger'],4.3),
P('AirPods Pro (2nd Gen)','AudioPower','Earbuds',18999,'Apple',['iphone','airpods','case'],4.8),
P('boAt Airdopes 141 TWS','AudioPower','Earbuds',1299,'boAt',['earbuds','case'],4.4),
P('Mi 20000mAh Power Bank 3i','AudioPower','Power Bank',1999,'Xiaomi',['powerbank','cable'],4.5),
P('Samsung 45W Fast Charger','AudioPower','Charger',2499,'Samsung',['samsung','charger','cable'],4.6),
P('iPhone 15 Clear Case','Protection','Phone Case',499,'Apple',['iphone','cover'],4.4),
P('Tempered Glass for Galaxy S24','Protection','Screen Guard',299,'Generic',['samsung','tempered glass'],4.3),
P('Laptop Sleeve 15.6 inch','Protection','Laptop Sleeve',899,'Targus',['laptop','sleeve'],4.5),
P('Camera Lens Protector','Protection','Lens Guard',349,'Generic',['iphone','lens'],4.2),
P('SanDisk 128GB microSD Card','Storage','Memory Card',1099,'SanDisk',['microsd','storage'],4.6),
P('Samsung 980 1TB NVMe SSD','Storage','SSD',7499,'Samsung',['ssd','laptop'],4.8),
P('HP 64GB USB Pendrive','Storage','Pendrive',649,'HP',['pendrive','storage'],4.4),
P('WD 2TB External Hard Disk','Storage','Hard Disk',5999,'Western Digital',['hdd','storage'],4.6),
P('Logitech MX Master 3S Mouse','Computing','Mouse',8495,'Logitech',['mouse','laptop'],4.9),
P('Zebronics Zeb-Transformer-K Keyboard','Computing','Keyboard',1199,'Zebronics',['keyboard','gaming'],4.3),
P('Portronics Aluminium Laptop Stand','Computing','Laptop Stand',1299,'Portronics',['laptop','stand'],4.5),
P('Portronics 1080p Webcam','Computing','Webcam',1599,'Portronics',['webcam','laptop'],4.2),
P('Noise ColorFit Pro 5 Smartwatch','Lifestyle','Smartwatch',2999,'Noise',['smartwatch','strap'],4.4),
P('Fire-Boltt Ninja Call Pro','Lifestyle','Smartwatch',1499,'Fire-Boltt',['smartwatch','strap'],4.3),
P('American Tourister 32L Backpack','Lifestyle','Backpack',1899,'American Tourister',['backpack','laptop'],4.6),
P('LED Desk Lamp with Wireless Charger','Lifestyle','Desk Lamp',1499,'Generic',['lamp','charger'],4.3),
];
(async()=>{await mongoose.connect(MONGO_URI);await Product.deleteMany({});await Product.insertMany(products);console.log('Seeded '+products.length+' products');await mongoose.disconnect();process.exit(0);})().catch(e=>{console.error(e.message);process.exit(1);});
