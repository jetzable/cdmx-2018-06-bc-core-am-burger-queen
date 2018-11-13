import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

import {
  defaultClient as apolloClient
} from "./main";

import {
  GET_PRODUCTS_LIST,
  GET_ORDER_LIST,
  ADD_ORDER
} from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    error: null,
    products: [],
    orders: []
  },
  mutations: {
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setProducts: (state, payload) => {
      state.products = payload;
    },
    setOrders: (state, payload) => {
      state.orders = payload;
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
    },
    getOrderList: ({
      commit
    }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_ORDER_LIST
        })
        .then(({
          data
        }) => {
          commit("setOrders", data.getOrderList);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    addOrder: ({
      commit
    }, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_ORDER,
          variables: payload,
          update: (cache, {
            data: {
              addOrder
            }
          }) => {
            // First read the query you want to update
            const data = cache.readQuery({
              query: GET_ORDER_LIST
            });
            // Create updated data
            data.getOrderList.unshift(addOrder);
            // Write updated data back to query
            console.log(data);
            cache.writeQuery({
              query: GET_ORDER_LIST,
              data
            });
          }
        })
        .then(({
          data
        }) => {
          console.log(data.addOrder);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error,
    products: state => state.products,
    orders: state => state.orders
  }
});