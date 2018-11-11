<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6 col-md-12 text-center">
        <div class="row">
          <h3 class="text-center mx-auto mt-2">Drinks</h3>
          <div class="col-md-12">
            <div v-for="drink in products" :key="drink.name" class="btn-group" v-if="drink.section === 'drink'">
              <v-btn color="primary" class="btn" v-on:click="addProductToList(drink)">{{drink.name}}</v-btn>
            </div>
          </div>
        </div>
        <div class="row">
          <h3 class="text-center mx-auto mt-2">Breakfast</h3>
          <div class="col-md-12">
            <div v-for="breakfast in products" :key="breakfast.name" class="btn-group" v-if="breakfast.section === 'breakfast'">
              <v-btn color="secondary" class="btn" v-on:click="addProductToList(breakfast)">{{breakfast.name}}</v-btn>
            </div>
          </div>
        </div>
        <div class="row">
          <h3 class="text-center mx-auto mt-2">Dinner</h3>
          <div class="col-md-12">
            <div v-for="dinner in products" :key="dinner.name" class="btn-group" v-if="dinner.section === 'dinner'">
              <v-btn color="info" class="btn" v-on:click="addProductToList(dinner)">{{dinner.name}}</v-btn>
            </div>
          </div>
        </div>
        <div class="row">
          <h3 class="text-center mx-auto mt-2">Extras & Sides</h3>
          <div class="col-md-12">
            <div v-for="side in products" :key="side.name" class="btn-group">
              <v-btn v-if="side.section === 'side'" color="success" class="btn" v-on:click="addProductToList(side)">{{side.name}}</v-btn>
            </div>
            <div v-for="extra in products" :key="extra.name" class="btn-group">
              <v-btn v-if="extra.section === 'extra'" color="error" class="btn" v-on:click="addProductToList(extra)">{{extra.name}}</v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 text-center">
        <v-form class="mt-4 text-center" v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleAddOrder">
          <div class="form-group mx-auto">
            <input type="number" placeholder="Table" class="form-control text-center" v-model="tableId">
            <input type="number" placeholder="Employee" class="form-control text-center" v-model="employeeId">
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
        </v-form>
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
      isFormValid: true,
      tableId: null,
      employeeId: null,
      orderList: []
    };
  },
  created() {
    this.handleGetProducts();
    this.addProductToList({});
  },
  computed: {
    ...mapGetters(["loading", "products"])
  },
  methods: {
    addProductToList(element) {
      this.orderList.push(element);
    },
    handleGetProducts() {
      this.$store.dispatch("getProductsList");
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