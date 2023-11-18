const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

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
        <!-- form contents -->
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
        this.fetchGoods()
    },
    methods: {
        fetchGoods() {
            fetch(`${API_URL}/catalogData.json`)
                .then((response) => response.json())
                .then((data) => {
                    this.goods = data
                    this.filteredGoods = data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        filterGoods() {
            const regexp = new RegExp(this.searchValue, 'i')
            this.filteredGoods =
                this.goods.filter((good) => regexp.test(good.product_name))
        },
        showCart() {
            this.isVisibleCart = !this.isVisibleCart
        },
        addToCart(item) {
            this.cartItems.push(item)
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