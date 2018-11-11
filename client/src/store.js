import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

import {
  defaultClient as apolloClient
} from "./main";

import {
  GET_PRODUCTS_LIST
} from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    error: null,
    products: []
  },
  mutations: {
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setProducts: (state, payload) => {
      state.products = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    }
  },
  actions: {
    getProductsList: ({
      commit
    }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_PRODUCTS_LIST
        })
        .then(({
          data
        }) => {
          commit("setProducts", data.getProductsList);
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
    products: state => state.products,
  }
});