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
        <p class="flex-grow test-sm">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'Listings', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'Listings', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next</router-link
          >
        </div>
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

    nextPage() {
      const listingsPerPage = 10;
      const maxPage = Math.ceil(this.sets.length / listingsPerPage);
      return maxPage > this.currentPage ? this.currentPage + 1 : undefined;
    },

    previousPage() {
      return 1 < this.currentPage ? this.currentPage - 1 : undefined;
    },

    displayedListings() {
      const pageNumber = this.currentPage;
      const firstListingPos = (pageNumber - 1) * 10;
      const lastListingPos = pageNumber * 10;
      return this.sets.slice(firstListingPos, lastListingPos);
    }
  },
  async mounted() {
    const baseURL = import.meta.env.VITE_APP_API_URL;
    const response = await axios.get(`${baseURL}/sets`);
    this.sets = response.data;
  }
};
</script>
