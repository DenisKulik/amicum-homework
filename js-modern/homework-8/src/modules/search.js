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