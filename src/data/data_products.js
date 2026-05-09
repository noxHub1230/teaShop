import product0 from"../material/products/products_0.png";
import product1 from"../material/products/products_1.png";
import product2 from"../material/products/products_2.png";

export const products = [
  { id: 0, 
    name: "夜月幽焰茶",
    image:product0,
    filter:["盒裝","提神","聯名特品"],
    description: "冥火淬焙、亙古不熄", 
    price: '$12.99' },
  {
    id:1,
    name:"千鶴幽青茶",
    image:product1,
    filter:["盒裝","養生","聯名特品"],
    description: "幽山長遠、林霧恆存", 
    price: '$12.99' 
  },
  {
    id:2,
    name:"千鶴幽青茶",
    image:product2,
    filter:["罐裝","養生","聯名特品"],
    description: "幽山長遠、林霧恆存", 
    price: '$12.99' 
  }
];
export const filter=[
  {type:"包裝",
    options:["罐裝","盒裝"]
  },
  {type:"功效",
    options:["助眠","提神","消化","養生"]
  },
  {type:"形式",
    options:["粉末","茶包","葉片","甜點","用品"]
  },
  {type:"咖啡因",
    options:["有咖啡因","無咖啡因"]
  },
  {type:"特選系列",
    options:["聯名特品","當期優惠"]
  }
];
export const sort =[
  "價格高至低",
  "價格低至高",
  "上架新至舊",
  "上架舊至新"
];