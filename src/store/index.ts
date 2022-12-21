import Vue from 'vue';
import Vuex from 'vuex';
import { Pokemon } from '@/interfaces/pokemon';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemons: [],
    updatedPokemons: [],
  },
  getters: {
    getPokemon: (state) => state.pokemons,
  },
  mutations: {
    setPokemon: (state, data) => {
      state.pokemons = data;
    },
    updatePokemon: (state, data) => {
      const statePokemons = JSON.parse(JSON.stringify(state.pokemons));
      const updatePokenmon = statePokemons.map((pokemon : Pokemon) => {
        const PokemonName: string = pokemon.name;
        return PokemonName === data.name ? data : pokemon;
      });
      console.log(updatePokenmon);
      state.pokemons = updatePokenmon;
    },
  },
  actions: {
    getPokemonsList: ({ commit }) => {
      Vue.axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0').then((response) => {
        // console.log(response.data);
        // TODO create an commit for next page
        commit('setPokemon', response.data.results);
      });
    },
    getPokemon: ({ commit }, url) => {
      Vue.axios.get(url).then((response) => {
        console.log(response.data);
        // TODO create an commit for next page
        commit('updatePokemon', response.data);
      });
    },
  },
  modules: {
  },
});
