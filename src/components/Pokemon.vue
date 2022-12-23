<template>
  <v-skeleton-loader
    v-if="isLoading"
    class="mx-auto"
    max-width="300"
    type="card"
  ></v-skeleton-loader>
  <v-card
    v-else
    class="mx-auto my-12 card"
    max-width="374"
  >
    <v-skeleton-loader
      v-if="!pokemon.sprites"
      class="mx-auto"
      max-width="300"
      type="card"
    ></v-skeleton-loader>
    <v-img
      v-else
      height="250"
      :src="pokemon.sprites.front_shiny"
    ></v-img>

    <v-card-title>{{pokemon.name}}</v-card-title>

    <v-card-text>
              <p> height: {{pokemon.height}}</p>
              <p> weight: {{pokemon.weight}}</p>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Abilities</v-card-title>

    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip :key="index" v-for="({ability}, index) in pokemon.abilities">
          {{ ability.name }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="openModal"
      >
        Get More detail
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="js">
import { mapActions } from 'vuex';

export default {
  name: 'pokemon-card',
  props: {
    pokemon: Object,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  watch: {
    pokemon(newPokemon, oldPokemon) {
      if (oldPokemon.name !== null
        && newPokemon.name !== oldPokemon.name
        && !newPokemon.abilities) {
        this.getPokemon(newPokemon.url);
      }
    },
  },
  async created() {
    if (this.pokemon) {
      await this.getPokemon(this.pokemon.url);
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions({
      getPokemon: 'getPokemon',
    }),
    openModal() {
      console.log('Open');
    },
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

  position: relative;
  top: 0;
  transition: all .1s ease-in;

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0,0,0,0.2);
  }
}
</style>
