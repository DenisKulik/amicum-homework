'use strict';

const API_URL =
  'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item">
		<h3>${this.title}</h3>
		<p>${this.price}</p>
		</div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
    this.filteredGoods = [];
  }
  async fetchGoods() {
    try {
      const response = await fetch(`${API_URL}/catalogData.json`);
      this.goods = await response.json();
      this.filteredGoods = await response.json();
    } catch (error) {
      console.error(error.message);
    }
  }
  filterGoods(value) {
    const regexp = new RegExp(value, 'i');
    this.filteredGoods = this.goods.filter((good) =>
      regexp.test(good.product_name)
    );
    this.render();
  }
  render() {
    let listHtml = '';
    this.filteredGoods.forEach((good) => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  getTotalPrice() {
    return this.goods.reduce((total, good) => total + good.price, 0);
  }
}

class Cart {
  constructor() {
    this.goods = [];
  }
  add(good) {
    this.goods.push(good);
  }
  remove(productId) {
    this.goods = this.goods.filter((item) => item.id_product !== productId);
  }
  getCartList() {
    return this.goods;
  }
  render() {
    let listHtml = '';
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.cart-list').innerHTML = listHtml;
  }
}

class CartItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="cart-item">
		<h3>${this.title}</h3>
		<p>${this.price}</p>
		</div>`;
  }
}

const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

const list = new GoodsList();
list.fetchGoods().then(() => list.render());
const totalPrice = list.getTotalPrice();
console.log('totalPrice', totalPrice);

searchButton.addEventListener('click', (e) => {
  const value = searchInput.value;
  list.filterGoods(value);
});

/* 
1.	Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
 */

function replaceSingleQuotes(text) {
  return text.replace(/'/g, '"');
}

const bigTextWithSingleQuotes = "'lorem	ipsum...'";
const textWithDoubleQuotes = replaceSingleQuotes(bigTextWithSingleQuotes);
console.log(textWithDoubleQuotes);

/* 
2.	Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
 */

function replaceSingleQuotesExceptInWords(text) {
  return text.replace(/(\s|^)'|'(\s|$)/g, '$1"$2');
}

const textWithQuotesAndWords = "'They aren't...'";
const improvedText = replaceSingleQuotesExceptInWords(textWithQuotesAndWords);
console.log(improvedText);
