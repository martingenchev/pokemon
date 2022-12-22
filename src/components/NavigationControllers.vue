<template>
  <div class="container">
    <v-pagination
      v-model="page"
      :length="4"
      :total-visible="5"
      circle
    ></v-pagination>
  </div>
</template>

<script>
export default {
  // Todo fix the length of the pagination use count from the API
  name: 'NavigationControllers',
  data() {
    return {
      page: 1,
    };
  },
  watch: {
    page(newPage, oldPage) {
      if (newPage < oldPage) {
        this.$emit('pageChange', 'prev');
      } else {
        this.$emit('pageChange', 'next');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  font-size: 24px;
  position: relative;
  text-align: center;
}
</style>
