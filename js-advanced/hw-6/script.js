'use strict';

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    cart: [],
    filteredGoods: [],
    searchLine: '',
    isVisibleCart: false,
    API_URL:
      'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
  },
  mounted() {
    this.fetchGoods();
  },
  methods: {
    async fetchGoods() {
      try {
        const response = await fetch(`${this.API_URL}/catalogData.json`);
        this.goods = await response.json();
        this.filteredGoods = structuredClone(this.goods);
      } catch (error) {
        console.error(error.message);
      }
    },

    filterGoods() {
      console.log(this.searchLine);
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter((good) =>
        regexp.test(good.product_name)
      );
    },
  },
});

Vue.component('goods-list', {
  props: ['goods'],
  template: `
		<div class="goods-list">
			<goods-item v-for="good in goods" :key="good.id_product" :good="good"></goods-item>
		</div>
	`,
});

Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
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
