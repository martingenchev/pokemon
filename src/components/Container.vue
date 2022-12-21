<template>
  <div class="card-wrapper">
    <div :key="index" v-for="(pokemon, index) in pokemons">
      <Pokemon  :pokemon="pokemon" />
    </div>
  </div>
</template>

<script>
import Pokemon from '@/components/Pokemon.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Container-wrap',
  components: {
    Pokemon,
  },
  computed: {
    pokemons() {
      return this.$store.state.pokemons;
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.getPokemonsList();
  },
  methods: {
    ...mapActions({
      getPokemonsList: 'getPokemonsList', // map `this.add()` to `this.$store.dispatch('increment')`
    }),
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
