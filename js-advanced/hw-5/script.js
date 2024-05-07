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
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter((good) =>
        regexp.test(good.product_name)
      );
    },
  },
});
