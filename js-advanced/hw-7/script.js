'use strict';

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    cart: [],
    filteredGoods: [],
    filteredCart: [],
    searchLine: '',
    isVisibleCart: false,
  },
  mounted() {
    this.fetchGoods();
    this.fetchCart();
  },
  methods: {
    async fetchGoods() {
      try {
        const response = await fetch('/catalogData');
        this.goods = await response.json();
        this.filteredGoods = structuredClone(this.goods);
      } catch (error) {
        console.error(error.message);
      }
    },

    async fetchCart() {
      try {
        const response = await fetch('/cartData');
        this.cart = await response.json();
        this.filteredCart = structuredClone(this.cart);
      } catch (error) {
        console.error(error.message);
      }
    },

    async addToCart(good) {
      try {
        const response = await fetch('/addToCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(good),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const res = await response.json();

        if (res.result === 1) {
          this.cart.push(good);
          this.filteredCart = structuredClone(this.cart);
        } else {
          console.error(
            'Error adding item to cart:',
            res.error || 'Unknown error'
          );
        }
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    },

    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter((good) =>
        regexp.test(good.product_name)
      );
    },

    filterCart() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredCart = this.cart.filter((good) =>
        regexp.test(good.product_name)
      );
    },
  },
});

Vue.component('goods-list', {
  props: ['goods'],
  template: `
		<div class="goods-list">
			<goods-item v-for="good in goods" :key="good.id_product" :good="good" @add-to-cart="$emit('add-to-cart', $event)"></goods-item>
		</div>
	`,
});

Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
			<button @click="$emit('add-to-cart', good)">
				В корзину
			</button>
    </div>
  `,
});

Vue.component('search', {
  props: ['searchLine'],
  template: `
		<input
			:value="searchLine"
			class="search-input"
			type="text"
			@input="$emit('input', $event.target.value)"
		/>
  `,
});

Vue.component('cart-list', {
  props: ['goods'],
  template: `
		<div class="goods-list">
			<goods-item v-for="good in goods" :key="good.id_product" :good="good"></goods-item>
		</div>
	`,
});

Vue.component('cart-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
    </div>
  `,
});
