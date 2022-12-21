<template>
  <div class="card">
    <div class="card-detail-box" v-if="pokemon">
      <div class="card-detail-box-wrapper">
        <img class="img-pokemon"
             :alt="pokemon.name"
             :src="pokemon.sprites.front_shiny">
        <h2>Name : {{pokemon.name}}</h2>
        <p> height: {{pokemon.height}}</p>
        <p> weight: {{pokemon.weight}}</p>
        <ul class="card-detail-box-abilities">
          <li :key="index" v-for="({ability}, index) in pokemon.abilities">
            {{ ability.name}}
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { mapActions } from 'vuex';

export default {
  name: 'pokemon-card',
  props: {
    pokemon: Object,
  },
  data() {
    return {
      // data object goes here
    };
  },
  created() {
    this.getPokemon(this.pokemon.url);
  },
  methods: {
    ...mapActions({
      getPokemon: 'getPokemon', // map `this.add()` to `this.$store.dispatch('increment')`
    }),
  },
};
</script>

<style scoped lang="scss">
.card {
  background: white;
  text-decoration: none;
  color: #444;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  min-height: 100%;

  // sets up hover state
  position: relative;
  top: 0;
  transition: all .1s ease-in;

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0,0,0,0.2);
  }

  .detail-box {
    padding: 20px;
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  h2 {
    font-size: 20px;
    margin: 0;
    color: #333;
  }

  p {
    flex: 1;
    line-height: 1.4;
  }

  span {
    font-size: 12px;
    font-weight: bold;
    color: #999;
    text-transform: uppercase;
    letter-spacing: .05em;
    margin: 2em 0 0 0;
  }

  .thumb {
    padding-bottom: 60%;
    background-size: cover;
    background-position: center center;
  }
}
</style>
