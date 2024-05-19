<template>
  <input
    :value="searchLine"
    class="search-input"
    type="text"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: ['searchLine'],
};
</script>
