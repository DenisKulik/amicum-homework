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