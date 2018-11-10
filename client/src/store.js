import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

import { defaultClient as apolloClient } from "./main";

import {
  GET_FOOD_LIST,
  GET_DRINK_LIST,
  GET_EXTRAS_LIST,
  GET_SIDES_LIST
} from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    error: null,
    food: [],
    drinks: [],
    extras: [],
    sides: []
  },
  mutations: {
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setFood: (state, payload) => {
      state.food = payload;
    },
    setExtras: (state, payload) => {
      state.extras = payload;
    },
    setSides: (state, payload) => {
      state.sides = payload;
    },
    setDrink: (state, payload) => {
      state.drinks = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    }
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
    },
    getExtrasList: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_EXTRAS_LIST
        })
        .then(({ data }) => {
          commit("setExtras", data.getExtrasList);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    getSidesList: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_SIDES_LIST
        })
        .then(({ data }) => {
          commit("setSides", data.getSidesList);
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
    drinks: state => state.drinks,
    extras: state => state.extras,
    sides: state => state.sides
  }
});
