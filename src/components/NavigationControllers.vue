<template>
  <div class="header container">
    <button class="arrow arrow-left" @click="$emit('pageChange', 'prev')" ></button>

    <button class="arrow arrow-right" @click="$emit('pageChange', 'next')"></button>
  </div>
</template>

<script>
export default {
  name: 'NavigationControllers',
};
</script>

<style scoped lang="scss">
.container {
  margin: 15% auto;
  font-size: 24px;
  position: relative;

  .arrow {
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;

    position: absolute;
  }

  .arrow-right {
    border-left: 15px solid #000;
    right: 0;
  }

  .arrow-left {
    border-right: 15px solid #000;
    left: 0;
  }
}

.header {
  text-align: center;
}
</style>
