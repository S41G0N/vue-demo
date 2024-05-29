<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <each-listing
        v-for="listing in displayedListings"
        :key="listing.id"
        :listing-object="listing"
      />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow test-sm">
          {{ currentPage }}
        </p>
      </div>
    </div>
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
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page) || 1;
    },
    displayedListings() {
      console.log(this.$route);
      const pageNumber = this.currentPage;
      const firstListingPos = (pageNumber - 1) * 10;
      const lastListingPos = pageNumber * 10;
      return this.sets.slice(firstListingPos, lastListingPos);
    }
  },
  async mounted() {
    const response = await axios.get("http://localhost:3000/sets");
    this.sets = response.data;
  }
};
</script>
