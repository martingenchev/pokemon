<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Container/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Container from '@/components/Container.vue';

export default Vue.extend({
  name: 'HomeView',
  components: {
    Container,
  },
});
</script>
<style lang="scss">

</style>
