<template>
  <div class="goods-list">
    <GoodsItem
      v-for="good in goods"
      :key="good.id_product"
      :good="good"
      @add-to-cart="$emit('add-to-cart', $event)"
    />
  </div>
</template>

<script>
import GoodsItem from './GoodsItem.vue';

export default {
  props: ['goods'],
  components: {
    GoodsItem,
  },
};
</script>
