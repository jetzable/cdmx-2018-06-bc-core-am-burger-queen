import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Order from "./components/Order.vue";
import Signin from "./components/Auth/Signin.vue";
import New from "./components/Auth/New.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin
    },
    {
      path: "/order",
      name: "order",
      component: Order
    },
    {
      path: "/new",
      name: "new",
      component: New
    }
  ]
});
