<template>
  <div>
    <OptionsModule
      @limitChange="limitChange"
      @search="search"
      @sortBy="sortBy"
    />
    <NavigationControllers @pageChange="pageChange" />
    <div class="card-wrapper" v-if="pokemons !== 'Not Found'">
      <div :key="index" v-for="(pokemon, index) in pokemons">
        <Pokemon  :pokemon="pokemon" />
      </div>
    </div>
    <div v-else>
      <p> Not Found</p>
    </div>
    <NavigationControllers @pageChange="pageChange" />
  </div>
</template>

<script>
import Pokemon from '@/components/Pokemon.vue';
import NavigationControllers from '@/components/NavigationControllers.vue';
import OptionsModule from '@/components/OptionsModule.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Container-wrap',
  components: {
    Pokemon,
    NavigationControllers,
    OptionsModule,
  },
  computed: {
    pokemons() {
      if (this.searchData.search !== undefined) {
        console.log('this.searchData.search', this.searchData.search);
        console.log('this.applySearch()', this.applySearch());
        return this.applySearch();
      }
      return this.$store.getters.getPokemons;
    },
  },
  data() {
    return {
      limit: 20,
      searchData: {},
    };
  },
  mounted() {
    this.getPokemonsList({ limit: 20, offset: 0 });
  },
  methods: {
    ...mapActions({
      getPokemonsList: 'getPokemonsList',
      setSortedPokemons: 'setSortedPokemons',
    }),
    pageChange(page) {
      this.getPokemonsList({ page });
    },
    limitChange(limit) {
      this.getPokemonsList({ limit, offset: 0 });
    },
    search(data) {
      this.searchData = data;
    },
    sortBy(sortValue) {
      const localPokemons = JSON.parse(JSON.stringify(this.pokemons));
      const sortedPokemon = localPokemons.sort((pokemonA, pokemonB) => {
        if (sortValue === 'name') {
          const nameA = pokemonA[sortValue].toUpperCase();
          const nameB = pokemonB[sortValue].toUpperCase();
          if (nameA > nameB) {
            return 1;
          }
          if (nameA < nameB) {
            return -1;
          }

          // names must be equal
          return 0;
        }
        return pokemonA[sortValue] - pokemonB[sortValue];
      });
      this.setSortedPokemons(sortedPokemon);
    },
    applySearch() {
      const localPokemons = JSON.parse(JSON.stringify(this.$store.getters.getPokemons));
      const foundPokemons = localPokemons.filter((pokemon) => {
        if (this.searchData.searchBy === 'abilities') {
          // TODO logic for search by abilities
        }
        return pokemon[this.searchData.searchBy].includes(this.searchData.search);
      });
      if (foundPokemons.length) {
        return foundPokemons;
      }
      return 'Not Found';
    },
  },
};
</script>

<style scoped lang="scss">
.card-wrapper {
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;

  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;

  @media (min-width: 30em) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 60em) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
