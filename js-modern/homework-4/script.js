// api
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText)
                } else {
                    reject(
                        new Error(`Request failed with status ${xhr.status}`))
                }
            }
        }

        xhr.open('GET', url, true)
        xhr.send()
    })
}


class GoodsItem {
    constructor(product_name, price) {
        this.product_name = product_name
        this.price = price
    }

    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`
    }
}

class GoodsList {
    constructor() {
        this.goods = []
        this.filteredGoods = []
    }

    fetchGoods() {
        return makeGETRequest(`${API_URL}/catalogData.json`)
            .then((goods) => {
                this.goods = JSON.parse(goods)
                this.filteredGoods = JSON.parse(goods)
            })
    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i')
        this.filteredGoods =
            this.goods.filter(good => regexp.test(good.product_name))
        this.render()
    }

    render() {
        let listHtml = ''
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price)
            listHtml += goodItem.render()
        })
        document.querySelector('.goods-list').innerHTML = listHtml
    }

    getTotalPrice() {
        let totalPrice = 0
        this.goods.forEach(good => {
            totalPrice += good.price
        })
        return totalPrice
    }
}

class Cart {
    constructor() {
        this.items = []
    }

    addItem(item) {
        this.items.push(item)
    }

    removeItem(item) {
        const index = this.items.indexOf(item)
        if (index > -1) this.items.splice(index, 1)
    }

    getItems() {
        return this.items
    }

    getTotalPrice() {
        let totalPrice = 0
        this.items.forEach(item => {
            totalPrice += item.price
        })
        return totalPrice
    }
}

class CartItem {
    constructor(title, price) {
        this.title = title
        this.price = price
    }

    render() {
        return `<div class="cart-item"><h3>${this.title}</h3><p>${this.price}</p></div>`
    }
}

const list = new GoodsList()
list.fetchGoods()
    .then(() => {
        list.render()
    })
    .catch((error) => {
        console.error(error)
    })

const searchButton = document.querySelector('.search-button')
const searchInput = document.querySelector('.goods-search')
const form = document.querySelector('#feedback-form')

searchButton.addEventListener('click', (e) => {
    const value = searchInput.value
    list.filterGoods(value)
})

form.addEventListener('submit', function (event) {
    event.preventDefault()

    const nameInput = document.querySelector('#name')
    const phoneInput = document.querySelector('#phone')
    const emailInput = document.querySelector('#email')

    // Reset validation styles
    nameInput.style.outline = ''
    phoneInput.style.outline = ''
    emailInput.style.outline = ''

    // Validation rules
    const nameRegex = /[A-Za-zА-Яа-яЁё\s]+/
    const phoneRegex = /\+7\(\d{3}\)\d{3}-\d{4}/
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/

    let valid = true

    if (!nameRegex.test(nameInput.value)) {
        nameInput.style.outline = '1px solid red'
        valid = false
    }

    if (!phoneRegex.test(phoneInput.value)) {
        phoneInput.style.outline = '1px solid red'
        valid = false
    }

    if (!emailRegex.test(emailInput.value)) {
        emailInput.style.outline = '1px solid red'
        valid = false
    }

    if (valid) {
        // Perform form submission or other actions
        alert('Form submitted successfully.')
    } else {
        alert('Form validation failed.')
    }
})



