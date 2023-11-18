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