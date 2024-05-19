<template>
  <div class="goods-item">
    <h3>{{ good.product_name }}</h3>
    <p>{{ good.price }}</p>
    <button @click="$emit('add-to-cart', good)">В корзину</button>
  </div>
</template>

<script>
export default {
  props: ['good'],
};
</script>