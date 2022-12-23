<template>
<div>
  <router-link :to="`/`"> Back </router-link>
  <p> {{ $route.params }} </p>
</div>
</template>

<script>
export default {
  name: 'PokemonView.vue',
  // TODO fetch the pokemon data from the state and display
  // TODO styling
};
</script>

<style scoped>

</style>
