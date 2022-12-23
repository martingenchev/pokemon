<template>
<div class="option-module">

  <div  class="option-module-limit-change-box">
    <h4> Display  amount cards</h4>
    <v-btn
      rounded
      :key="index"
      @click="$emit('limitChange', limit)"
      v-for="(limit, index) in filterOption.limitOfCardsToDisplay"
    >
      {{ limit }}
    </v-btn>
  </div>

  <div class="option-module-search-box">
    <h4>Search by</h4>
    <v-radio-group row v-model="filterOption.searchBy">
      <v-radio
        :key="index"
        v-for="(searchOption, index) in filterOption.searchByOptions"
        :label="`${searchOption}`"
        :value="searchOption"
      ></v-radio>
    </v-radio-group>
    <v-text-field
      label="Search Pokemon"
      v-model="filterOption.search"
      @input="handleSearch"
    >
    </v-text-field>
  </div>

  <div class="option-module-sort-box">
    <h4>Sort by</h4>
    <v-radio-group row v-model="filterOption.sortOption" v-on:change="$emit('sortBy', $event)">
      <v-radio
        :key="index"
        v-for="(sortOption, index) in filterOption.sortBy"
        :label="`${sortOption}`"
        :value="sortOption"
      ></v-radio>
    </v-radio-group>
  </div>
</div>
</template>

<script>
export default {
  name: 'OptionsModule',
  props: {
    optionData: Object,
  },
  data() {
    return {
      filterOption: {
        limitOfCardsToDisplay: [10, 20, 50],
        searchByOptions: ['name', 'abilities'],
        searchBy: 'name',
        search: '',
        sortBy: ['name', 'height', 'weight'],
        sortOption: '',
      },
    };
  },
  watch: {
    'optionData.sortValueFromLS': {
      handler(newSort) {
        this.filterOption.sortOption = newSort;
      },
      immediate: true,
    },
    'optionData.searchValueFromLS': {
      handler(newSearch) {
        this.filterOption.searchBy = newSearch.searchBy;
        this.filterOption.search = newSearch.search;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleSearch(value) {
      this.$emit('search', { searchBy: this.filterOption.searchBy, search: value });
    },
  },
};
</script>

<style scoped lang="scss">
.option-module{
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;

  @media (min-width: 30em) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 60em) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
