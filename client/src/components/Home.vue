<template>
  <v-app>
    <h1>Home</h1>
    <v-btn color="success">
      <v-icon>search</v-icon>Button
    </v-btn>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "home"
};
</script>
