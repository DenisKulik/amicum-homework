import Search from './search.js'
import GoodsList from './goods-list.js'
import Cart from './cart.js'
import Feedback from './feedback.js'

const API_URL = 'http://localhost:3000'

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