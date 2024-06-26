'use strict';

const goods = [
  {title: 'Shirt', price: 150},
  {title: 'Socks', price: 50},
  {title: 'Jacket', price: 350},
  {title: 'Shoes', price: 250},
];

const renderGoodsItem = (title = 'No title', price = 0) => {
  return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
}

const renderGoodsList = (list) => {
  const goodsList = list.map(item => renderGoodsItem(item.title, item.price)).join('');
  document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);
