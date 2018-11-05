import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

import FormAlert from "./components/Shared/FormAlert.vue";

Vue.component("form-alert", FormAlert);

Vue.use(VueApollo);

//
// Setup ApolloClient
export const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql"
  // Auth Token
  // fetchOptions: {
  //   credentials: "include"
  // },
  // request: operation => {
  //   if (!localStorage.token) {
  //     localStorage.setItem("token", "");
  //   }
  //   operation.setContext({
  //     headers: {
  //       authorization: localStorage.getItem("token")
  //     }
  //   });
  // },
  // onError: ({ graphQLErrors, networkError }) => {
  //   if (networkError) {
  //     console.log("[Network Error]", networkError);
  //   }
  //   if (graphQLErrors) {
  //     for (let err of graphQLErrors) {
  //       if (err.name === "AuthenticationError") {
  //         store.commit("setAuthError", err);
  //         store.dispatch("signoutUser");
  //       }
  //     }
  //   }
  // }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App),
  created() {
    // execute getCurrentUser query
    this.$store.dispatch("getCurrentUser");
  }
}).$mount("#app");
