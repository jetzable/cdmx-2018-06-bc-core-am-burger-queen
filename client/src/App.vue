<template>
  <div>
    <!-- Horizontal Navbar -->
    <v-toolbar fixed color="secondary" dark>

      <!-- App Title -->
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor:pointer">
          <img src="https://i.imgur.com/NJ47q00.png" alt="BurgerJoint BurgerBar Logo" width="48px">
          BurgerJoint
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Horizontal NavBar Links -->
      <v-toolbar-items class="hidden-sm-only">
        <v-btn flat v-for="item in horizontalNavItem" :key="item.title" :to="item.link">
          <v-icon class="hidden-xs-only" left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>

      </v-toolbar-items>

    </v-toolbar>

    <!-- App content -->
    <main>
      <router-view />
    </main>
  </div>
</template>


<script>
export default {
  name: "App",
  computed: {
    horizontalNavItem() {
      return [
        { icon: "playlist_add", title: "Add Order", link: "/new" },
        { icon: "list_alt", title: "List Orders", link: "/order" }
      ];
    }
  }
};
</script>
