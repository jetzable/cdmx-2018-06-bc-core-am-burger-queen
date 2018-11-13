<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 col-lg-12">
        <table class="table table-hover text-center">
          <thead>
            <tr>
              <th scope="row">Table</th>
              <th scope="row">Order</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.table">
              <th scope="row" v-on:click="setOrderAsReady(order.table)">{{order.table}}</th>
              <td v-for="product in order.listOfProducts" :key="product">{{product}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "order",
  created() {
    this.listPendingOrders();
  },
  computed: {
    ...mapGetters(["loading", "orders"])
  },
  methods: {
    listPendingOrders() {
      this.$store.dispatch("getOrderList");
    },
    setOrderAsReady(table) {}
  }
};
</script>


<style>
.container-fluid {
  margin-top: 10%;
}
</style>
