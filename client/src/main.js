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
  uri: "https://burger-queen-project-back-end-ydvzlbmbrv.now.sh/graphql"
});

const apolloProvider = new VueApollo({
  defaultClient
});

Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider,
  router,
  store,
  render: h => h(App)
}).$mount("#app");