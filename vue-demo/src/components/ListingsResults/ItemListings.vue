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
import EachListing from "@/components/ListingsResults/EachListing.vue";
export default {
  name: "ItemListings",
  components: { EachListing }
};
</script>
