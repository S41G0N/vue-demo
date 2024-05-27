<template>
  <div class="flex flex-row flex-nowrap w-full">
    <listings-filter-sidebar />
    <item-listings />
  </div>
</template>

<script>
import ListingsFilterSidebar from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebar.vue";
import ItemListings from "@/components/ListingsResults/ItemListings.vue";

export default {
  name: "ListingsView",
  components: {
    ListingsFilterSidebar,
    ItemListings
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
