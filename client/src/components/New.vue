<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6 col-md-12 text-center">
        <h1 class="display-1 mt-4">Drinks</h1>
        <div v-for="drink in drinks" :key="drink.name" class="btn-group">
          <v-btn color="secondary" class="btn">{{drink.name}}</v-btn>
        </div>
        <h1 class="display-1 mt-4">Breakfast</h1>
        <div v-for="product in food" :key="product.name" v-if="product.shift === true" class="btn-group">
          <v-btn color="secondary" class="btn">{{product.name}}</v-btn>
        </div>
        <h1 class="display-1 mt-4">Dinner</h1>
        <div v-for="product in food" :key="product.name" v-if="product.shift === false" class="btn-group">
          <v-btn color="secondary" class="btn">{{product.name}}</v-btn>
        </div>
        <!-- <h1 class="display-1 mt-4">Extras & Sides</h1>
        <div v-for="product in food" :key="product.name" v-if="product.shift === false" class="btn-group">
          <v-btn color="secondary" class="btn">{{product.name}}</v-btn>
        </div> -->
      </div>
      <div class="col-lg-6 col-md-12 text-center">
        <form class="mt-4 text-center" @submit.prevent="handleAddOrder">
          <div class="form-group mx-auto">
            <input type="number" placeholder="Table" class="form-control text-center" v-model="tableId">
            <input type="number" placeholder="Employee" class="form-control text-center" v-model="employeeId">
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
      employeeId: ""
    };
  },
  created() {
    this.handleGetFood();
    this.handleGetDrink();
  },
  computed: {
    ...mapGetters(["loading", "food", "drinks"])
  },
  methods: {
    handleGetFood() {
      this.$store.dispatch("getFoodList");
    },
    handleGetDrink() {
      this.$store.dispatch("getDrinkList");
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
  margin-top: 5%;
}

.btn {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.form-control {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: larger;
  display: inline-block;
  margin: 1em;
}
</style>