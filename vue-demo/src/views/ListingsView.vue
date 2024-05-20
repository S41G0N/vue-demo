<template>
  <h1 class="text-6xl font-bold">Listings page</h1>
  <h2>{{ routeInfo }}</h2>
  <button @click="goToHome">Homepage</button>
</template>

<script>
export default {
  name: "ListingsView",
  computed: {
    /* Exposure of $route object -> Contains properties of the router  object */
    routeInfo() {
      console.log(this.$route);
      return "Irrelevant";
    },
    /* Exposure of $router object -> Contains functions to control routes */
    routerInfo() {
      console.log(this.$route);
      return "Irrelevant";
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
