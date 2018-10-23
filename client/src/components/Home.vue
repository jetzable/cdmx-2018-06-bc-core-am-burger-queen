<template>
  <v-app>
    <div class="container-fluid text-center">
      <a href="/signin">
        <img id="main-logo" class="image-fluid mx-auto" src="https://i.imgur.com/NJ47q00.png" alt="BurgerJoint BurgerBar Logo">
      </a>
    </div>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "home"
};
</script>

 <style>
#main-logo {
  margin-top: 20%;
}
</style>