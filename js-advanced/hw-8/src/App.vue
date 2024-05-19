<template>
  <div>
    <header class="header">
      <search v-model="searchLine"></search>
      <button class="search-button" type="button" @click="filterGoods">
        Искать
      </button>
      <button
        class="cart-button"
        type="button"
        @click="isVisibleCart = !isVisibleCart"
      >
        Корзина
      </button>
    </header>
    <main>
      <div v-if="!isVisibleCart">
        <goods-list
          v-if="filteredGoods.length"
          :goods="filteredGoods"
          @add-to-cart="addToCart"
        ></goods-list>
        <div v-else>Нет данных</div>
      </div>
      <div v-else>
        <goods-list v-if="cart.length" :goods="filteredCart"></goods-list>
        <div v-else>Корзина пуста</div>
      </div>
    </main>
  </div>
</template>

<script>
import Search from './components/Search.vue';
import GoodsList from './components/GoodsList.vue';

export default {
  name: 'App',
  components: {
    Search,
    GoodsList,
  },
  data: () => ({
    goods: [],
    cart: [],
    filteredGoods: [],
    filteredCart: [],
    searchLine: '',
    isVisibleCart: false,
  }),
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
};
</script>

<style>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #212121;
  color: #fff;
}

.cart-button,
.search-button {
  background-color: #f5f5f5;
  color: #212121;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-input {
  display: block;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.goods-item {
  width: 30%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
</style>

