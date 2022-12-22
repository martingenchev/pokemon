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
    <v-text-field label="Search Pokemon" @input="handleSearch" ></v-text-field>
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
  methods: {
    handleSearch(value) {
      console.log(value);
      if (value.length > 2) {
        this.$emit('search', { searchBy: this.filterOption.searchBy, search: value });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.option-module{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
