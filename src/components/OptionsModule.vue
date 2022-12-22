<template>
<div class="option-module">
  <div  class="option-module-limit-change-box">
    <h4> display  amount cards</h4>
    <button :key="index"
          @click="$emit('limitChange', limit)"
          v-for="(limit, index) in filterOption.limitOfCardsToDisplay"
    >
      {{ limit }}
    </button>
  </div>
  <div class="option-module-search-box">
      <label
        :for="searchOption"
        :key="index"
        v-for="(searchOption, index) in filterOption.searchByOptions"
      >
        {{ searchOption }}
        <input
          type="radio"
          :id="searchOption"
          :value="searchOption"
          v-model="filterOption.searchBy"
        />
      </label>
      <label for="search">
      Search
      <input type="text" id="search" @input="handleSearch">
    </label>
  </div>
  <div class="option-module-sort-box">
    <p>Sort by</p>
    <label
      :for="sortOption"
      :key="index"
      v-for="(sortOption, index) in filterOption.sortBy"
    >
      {{ sortOption }}
      <input
        type="radio"
        :id="sortOption"
        :value="sortOption"
        @input="$emit('sortBy', sortOption)"
      />
    </label>
  </div>
</div>
</template>

<script>
export default {
  name: 'OptionsModule',
  data() {
    return {
      filterOption: {
        limitOfCardsToDisplay: [10, 20, 50],
        searchByOptions: ['name', 'abilities'],
        searchBy: 'name',
        search: '',
        sortBy: ['name', 'height', 'weight'],
      },
    };
  },
  methods: {
    handleSearch(event) {
      if (event.target.value.length > 2) {
        this.$emit('search', { searchBy: this.filterOption.searchBy, search: event.target.value });
      }
    },
  },
  // TODO 1. create search logic in the current pokemon list
  // TODO.2 create sorting logic for name, height, weight
};
</script>

<style scoped>

</style>
