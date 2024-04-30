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
  }
  async fetchGoods() {
    try {
      const response = await fetch(`${API_URL}/catalogData.json`);
      this.goods = await response.json();
    } catch (error) {
      console.error(error.message);
    }
  }
  render() {
    let listHtml = '';
    this.goods.forEach((good) => {
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

const list = new GoodsList();
list.fetchGoods().then(() => list.render());
const totalPrice = list.getTotalPrice();
console.log('totalPrice', totalPrice);

/*
Некая сеть фастфуда предлагает несколько видов гамбургеров:
a. Маленький (50 рублей, 20 калорий).
b. Большой (100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
a.С сыром (+10 рублей, +20 калорий).
b.С салатом (+20 рублей, +5 калорий).
c.С картофелем (+15 рублей, +10 калорий).
Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и политьмайонезом (+20 рублей, +5 калорий).
Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса со следующей страницы, но можно использовать и свою.
 */

class Hamburger {
  constructor(size, stuffing, toppings = []) {
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = toppings;
  }

  addTopping(topping) {
    this.toppings.push(topping);
  }

  removeTopping(topping) {
    const index = this.toppings.indexOf(topping);
    if (index > -1) {
      this.toppings.splice(index, 1);
    }
  }

  getToppings() {
    return this.toppings;
  }

  getSize() {
    return this.size;
  }

  getStuffing() {
    return this.stuffing;
  }

  calculatePrice() {
    let price = this.size === 'Маленький' ? 50 : 100;
    this.toppings.forEach((topping) => {
      price += topping.price;
    });
    return price;
  }

  calculateCalories() {
    let calories = this.size === 'Маленький' ? 20 : 40;
    this.toppings.forEach((topping) => {
      calories += topping.calories;
    });
    return calories;
  }
}

class Topping {
  constructor(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
  }
}

const cheese = new Topping('Сыром', 10, 20);
const salad = new Topping('Салатом', 20, 5);
const potato = new Topping('Картофелем', 15, 10);
const dressing = new Topping('Приправой', 15, 0);
const mayonnaise = new Topping('Полить майонезом', 20, 5);

const smallHamburger = new Hamburger('Маленький', 'Сыром', [cheese]);
const bigHamburger = new Hamburger('Большой', 'Сыром', [cheese]);

smallHamburger.addTopping(salad);
smallHamburger.addTopping(potato);
bigHamburger.addTopping(salad);
bigHamburger.addTopping(dressing);
bigHamburger.addTopping(mayonnaise);

const smallHamburgerPrice = smallHamburger.calculatePrice();
const smallHamburgerCalories = smallHamburger.calculateCalories();
const bigHamburgerPrice = bigHamburger.calculatePrice();
const bigHamburgerCalories = bigHamburger.calculateCalories();

console.log(
  `Маленький гамбургер: цена - ${smallHamburgerPrice}, калорийность - ${smallHamburgerCalories}`
);
console.log(
  `Большой гамбургер: цена - ${bigHamburgerPrice}, калорийность - ${bigHamburgerCalories}`
);
