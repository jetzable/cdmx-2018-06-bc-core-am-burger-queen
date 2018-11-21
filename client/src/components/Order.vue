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
            <tr v-for="order in orders" :key="order.table" v-if="order.status === false">
              <th scope="row">{{order.table}}</th>
              <td>
                <ul class="list-group list-group-flush" v-for="product in order.listOfProducts" :key="product">
                  <li class="list-group-item">{{product}}</li>
                </ul>
              </td>
              <td>
                <v-btn v-on:click="setOrderAsReady(order)" color="error">Delivered</v-btn>
              </td>
              <td>
                <PayPal amount="10.00" currency="USD" :client="credentials" env="sandbox">
                </PayPal>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import PayPal from "vue-paypal-checkout";

export default {
  name: "order",
  data() {
    return {
      credentials: {
        sandbox: "<sandbox client id>",
        production: "<production client id>"
      }
    };
  },
  created() {
    this.listPendingOrders();
  },
  computed: {
    ...mapGetters(["loading", "orders"])
  },
  methods: {
    handlePayment(amount, currency, credentials) {
      console.log(amount, currency, credentials);
    },
    listPendingOrders() {
      this.$store.dispatch("getOrderList");
    },
    setOrderAsReady(order) {
      this.$store.dispatch("updateOrderStatus", {
        table: order.table,
        employee: order.employee,
        status: !status,
        listOfProducts: order.listOfProducts,
        listOfPrices: order.listOfPrices
      });
      this.$router.go();
    }
  },
  components: {
    PayPal
  }
};
</script>


<style scoped>
.container-fluid {
  margin-top: 10%;
}
</style>
