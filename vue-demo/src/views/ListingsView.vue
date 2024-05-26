<template>
  <div>
    <listings-filter-sidebar />
  </div>
</template>

<script>
import ListingsFilterSidebar from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebar.vue";
export default {
  name: "ListingsView",
  components: {
    ListingsFilterSidebar
  },
  computed: {
    /* Exposure of $route object -> Contains properties of the router  object */
    routeInfo() {
      console.log(this.$route);
      return "Irrelevant";
    },
    /* Exposure of $router object -> Contains functions to control routes */
    routerInfo() {
      console.log(this.$router);
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
