class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    getTotalPrice() {
        let totalPrice = 0;
        this.goods.forEach(good => {
            totalPrice += good.price;
        });
        return totalPrice;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index > -1) this.items.splice(index, 1);
    }

    getTotalPrice() {
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.price;
        });
        return totalPrice;
    }
}

class CartItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="cart-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();

