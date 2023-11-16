const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const app = new Vue({
    el: '#app',
    data() {
        return {
            goods: [],
            filteredGoods: [],
            cartItems: [],
            searchValue: '',
            name: '',
            phone: '',
            email: '',
            textarea: '',
            isVisibleCart: false,
        }
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

            if (!nameRegex.test(this.name)) {
                valid = false
            }

            if (!phoneRegex.test(this.phone)) {
                valid = false
            }

            if (!emailRegex.test(this.email)) {
                valid = false
            }

            if (valid) {
                // Perform form submission or other actions
                alert('Form submitted successfully.')
            } else {
                alert('Form validation failed.')
            }
        },
    },
})