<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6 col-md-12 text-center">
        <div class="row">
          <div class="col-md-6 align-title">
            <h3>Drinks</h3>
          </div>
          <div class="col-md-6 mt-4">
            <div v-for="drink in drinks" :key="drink.name" class="btn-group">
              <v-btn color="primary" class="btn" v-on:click="addProductToOrder(drink)">{{drink.name}}</v-btn>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 align-title">
            <h3>Breakfast</h3>
          </div>
          <div class="col-md-6">
            <div v-for="product in food" :key="product.name" v-if="product.shift === true" class="btn-group">
              <v-btn color="secondary" class="btn" v-on:click="addProductToOrder(product)">{{product.name}}</v-btn>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 align-title">
            <h3>Dinner</h3>
          </div>
          <div class="col-md-6">
            <div v-for="prod in food" :key="prod.name" v-if="prod.shift === false" class="btn-group">
              <v-btn color="info" class="btn" v-on:click="addProductToOrder(prod)">{{prod.name}}</v-btn>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 align-title">
            <h3>Extras & Sides</h3>
          </div>
          <div class="col-md-6">
            <div v-for="side in sides" :key="side.name" class="btn-group">
              <v-btn color="success" class="btn" v-on:click="addProductToOrder(side)">{{side.name}}</v-btn>
            </div>
            <div v-for="extra in extras" :key="extra.name" class="btn-group">
              <v-btn color="error" class="btn" v-on:click="addProductToOrder(extra)">{{extra.name}}</v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 text-center">
        <form class="mt-4 text-center" @submit.prevent="handleAddOrder">
          <div class="form-group mx-auto">
            <input type="number" placeholder="Table" class="form-control text-center" v-model="tableId">
            <input type="number" placeholder="Employee" class="form-control text-center" v-model="employeeId">
            <p class="btn">{{this.total}}</p>
          </div>
          <div class="row">
            <div class="col-md-6">
              <ul class="list-group list-group-flush" v-if="this.orderList.length > 0">
                Product: <li v-for="element in orderList" :key="element.name" class="list-group-item">{{element.name}}</li>
              </ul>
            </div>
            <div class="col-md-6">
              <ul class="list-group list-group-flush" v-if="this.orderList.length > 0">
                <li v-for="element in orderList" :key="element.price" class="list-group-item">$ {{element.price}}</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "new",
  data() {
    return {
      tableId: "",
      employeeId: "",
      orderList: [],
      total: 0
    };
  },
  created() {
    this.handleGetFood();
    this.handleGetDrink();
    this.handleGetExtras();
    this.handleGetSides();
    this.addProductToOrder({});
  },
  computed: {
    ...mapGetters(["loading", "food", "drinks", "extras", "sides"])
  },
  methods: {
    addProductToOrder(element) {
      this.orderList.push(element);
    },
    handleGetFood() {
      this.$store.dispatch("getFoodList");
    },
    handleGetDrink() {
      this.$store.dispatch("getDrinkList");
    },
    handleGetExtras() {
      this.$store.dispatch("getExtrasList");
    },
    handleGetSides() {
      this.$store.dispatch("getSidesList");
    },
    handleNewOrder() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addOrder", {});
        this.$router.push("/");
      }
    }
  }
};
</script>


<style scoped>
html,
body {
  height: 100vh;
}

.container-fluid {
  margin-top: 7%;
}

.btn {
  border-radius: 10px;
}

.form-control {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: larger;
  display: inline-block;
  margin: 1em;
}

.align-title {
  align-self: center;
}
</style>