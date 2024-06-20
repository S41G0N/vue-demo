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
import { mapActions, mapState } from "pinia";

import EachListing from "@/components/ListingsResults/EachListing.vue";
import {
  useListingsStore,
  FETCH_LISTINGS,
  FILTERED_MINIFIGURES,
  FILTERED_CONDITION
} from "@/stores/listings.js";

export default {
  name: "ItemListings",
  components: { EachListing },
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page) || 1;
    },

    previousPage() {
      return 1 < this.currentPage ? this.currentPage - 1 : undefined;
    },

    ...mapState(useListingsStore, {
      FILTERED_MINIFIGURES,
      FILTERED_CONDITION,
      nextPage() {
        const listingsPerPage = 10;
        const maxPage = Math.ceil(this.FILTERED_CONDITION.length / listingsPerPage);
        return maxPage > this.currentPage ? this.currentPage + 1 : undefined;
      },
      displayedListings() {
        const pageNumber = this.currentPage;
        const firstListingPos = (pageNumber - 1) * 10;
        const lastListingPos = pageNumber * 10;
        return this.FILTERED_CONDITION.slice(firstListingPos, lastListingPos);
      }
    })
  },
  async mounted() {
    this.FETCH_LISTINGS();
  },

  methods: {
    ...mapActions(useListingsStore, [FETCH_LISTINGS])
  }
};
</script>
