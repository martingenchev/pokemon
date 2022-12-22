import Vue from 'vue';
import Vuex from 'vuex';
import { Pokemon } from '@/interfaces/pokemon';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemons: [],
    next: '',
    previous: '',
  },
  getters: {
    getPokemons: (state) => state.pokemons,
  },
  mutations: {
    setPokemons: (state, data) => {
      state.pokemons = data;
    },
    updatePokemon: (state, data) => {
      const statePokemons = JSON.parse(JSON.stringify(state.pokemons));
      state.pokemons = statePokemons.map((pokemon: Pokemon) => {
        const PokemonName: string = pokemon.name;
        return PokemonName === data.name ? data : pokemon;
      });
    },
    setPage: (state, data) => {
      state.next = data.next;
      state.previous = data.previous;
    },
  },
  actions: {
    getPokemonsList: ({ commit, rootState }, payload) => {
      let apiRoute = `https://pokeapi.co/api/v2/pokemon?limit=${payload.limit}&offset=${payload.offset}`;
      if (rootState.next && payload.page === 'next') {
        apiRoute = rootState.next;
      } else if (rootState.previous && payload.page === 'previous') {
        apiRoute = rootState.previous;
      }
      Vue.axios.get(apiRoute).then((response) => {
        commit('setPage', response.data);
        commit('setPokemons', response.data.results);
      });
    },
    getPokemon: ({ commit }, url: string) => {
      Vue.axios.get(url).then((response) => {
        commit('updatePokemon', response.data);
      });
    },
    setSortedPokemons: ({ commit }, payload: Array<Pokemon>) => {
      commit('setPokemons', payload);
    },
  },
  modules: {
  },
});
