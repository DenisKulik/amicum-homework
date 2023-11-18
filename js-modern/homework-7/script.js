const API_URL = 'http://localhost:3000'

Vue.component('search', {
    template: `
    <div>
      <input v-model="searchValue" type="text" class="goods-search" />
      <button @click="filterGoods" class="search-button" type="button">Искать</button>
    </div>
  `,
    props: ['value'],
    data() {
        return {
            searchValue: this.value,
        }
    },
    methods: {
        filterGoods() {
            this.$emit('input', this.searchValue)
        },
    },
})

Vue.component('goods-list', {
    template: `
    <div class="goods-list">
      <div class="goods-item"
           v-for="good in goods"
           :key="good.id_product"
      >
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <button @click="addToCart(good)" class="buy-button" type="button">В корзину</button>
      </div>
    </div>
  `,
    props: ['goods'],
    methods: {
        addToCart(item) {
            this.$emit('add-to-cart', item)
        },
    },
})

Vue.component('cart', {
    template: `
    <div class="cart">
      <h2>Корзина</h2>
      <div v-for="item in cartItems" :key="item.title" class="cart-item">
        <h3>{{ item.product_name }}</h3>
        <p>{{ item.price }}</p>
      </div>
      <p>Total Price: {{ getTotalCartPrice() }}</p>
    </div>
  `,
    props: ['cartItems'],
    methods: {
        getTotalCartPrice() {
            return this.cartItems.reduce((totalPrice, item) => totalPrice + item.price, 0)
        },
    },
})

Vue.component('feedback', {
    template: `
    <footer>
      <form id="feedback-form" @submit.prevent="submitForm">
        <form id="feedback-form" @submit.prevent="submitForm">
        <div>
          <label for="name">Имя:</label>
          <input v-model="name" type="text" id="name" name="name" required />
        </div>
        <div>
          <label for="phone">Телефон:</label>
          <input v-model="phone" type="tel" id="phone" name="phone" required />
        </div>
        <div>
          <label for="email">E-mail:</label>
          <input v-model="email" type="email" id="email" name="email" required />
        </div>
        <div>
          <label for="text">Текст:</label>
          <textarea id="text" v-model="textarea" name="text"></textarea>
        </div>
        <button type="submit">Отправить</button>
      </form>
      </form>
    </footer>
  `,
    methods: {
        submitForm() {
            this.$emit('submit-form')
        },
    },
})

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        cartItems: [],
        searchValue: '',
        name: '',
        phone: '',
        email: '',
        textarea: '',
        isVisibleCart: false,
    },
    mounted() {
        this.makeGETRequest()
    },
    methods: {
        makeGETRequest() {
            fetch(`${API_URL}/catalogData`)
                .then((response) => response.json())
                .then((data) => {
                    this.goods = data
                    this.filteredGoods = data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        makePOSTRequest(url, data, callback) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            })
                .then((response) => response.text())
                .then((data) => {
                    callback(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        filterGoods() {
            const regexp = new RegExp(this.searchValue, 'i')
            this.filteredGoods =
                this.goods.filter((good) => regexp.test(good.product_name))
        },
        showCart() {
            this.getCartData()
            this.isVisibleCart = !this.isVisibleCart
        },
        getCartData() {
            fetch(`${API_URL}/cartData`)
                .then((response) => response.json())
                .then((data) => {
                    this.cartItems = data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        addToCart(item) {
            const url = `${API_URL}/addToCart`;

            this.makePOSTRequest(url, item, (response) => {
                const responseData = JSON.parse(response);
                if (responseData.result === 1) {
                    console.log('Item added to cart successfully')
                    this.getCartData()
                } else {
                    console.log('Failed to add item to cart')
                }
            });
        },
        removeFromCart(item) {
            const index = this.cartItems.indexOf(item)
            if (index > -1) {
                this.cartItems.splice(index, 1)
            }
        },
        getTotalCartPrice() {
            return this.cartItems.reduce(
                (totalPrice, item) => totalPrice + item.price, 0)
        },
        submitForm() {
            // Validation rules
            const nameRegex = /[A-Za-zА-Яа-яЁё\s]+/
            const phoneRegex = /\+7\(\d{3}\)\d{3}-\d{4}/
            const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/

            let valid = true

            if (!nameRegex.test(this.name)) valid = false
            if (!phoneRegex.test(this.phone)) valid = false
            if (!emailRegex.test(this.email)) valid = false

            if (valid) alert('Form submitted successfully.')
            else alert('Form validation failed.')
        },
    },
})