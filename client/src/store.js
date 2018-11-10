import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

import { defaultClient as apolloClient } from "./main";

import { GET_FOOD_LIST, GET_DRINK_LIST } from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    error: null,
    food: [],
    drinks: []
  },
  mutations: {
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setFood: (state, payload) => {
      state.food = payload;
    },
    setDrink: (state, payload) => {
      state.drinks = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    setAuthError: (state, payload) => {
      state.authError = payload;
    },
    clearSearchResults: state => (state.searchResults = []),
    clearError: state => (state.error = null)
  },
  actions: {
    getFoodList: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_FOOD_LIST
        })
        .then(({ data }) => {
          commit("setFood", data.getFoodList);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    getDrinkList: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_DRINK_LIST
        })
        .then(({ data }) => {
          commit("setDrink", data.getDrinkList);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    }
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error,
    food: state => state.food,
    drinks: state => state.drinks
  }
});
