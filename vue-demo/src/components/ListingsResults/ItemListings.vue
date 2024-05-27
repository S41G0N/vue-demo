<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <each-listing />
      <each-listing />
      <each-listing />
    </ol>
  </main>
</template>

<script>
import axios from "axios";
import EachListing from "@/components/ListingsResults/EachListing.vue";

export default {
  name: "ItemListings",
  components: { EachListing },
  data() {
    return { sets: [] };
  },
  async mounted() {
    const response = await axios.get("http://localhost:3000/sets");
    this.sets = response.data;
  }
};
</script>
