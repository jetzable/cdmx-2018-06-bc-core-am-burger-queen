<template>
  <v-container text-xs-center mt-5 pt-5>
    <!-- AddPost  Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="primary--text">Agrega una Orden</h1>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        <v-btn v-for="product in food" :key="product.name">
          {{product.name}}
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        <v-btn v-for="product in drinks" :key="product.name">
          {{product.name}}
        </v-btn>
      </v-flex>
    </v-layout>
    

  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "new",
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
