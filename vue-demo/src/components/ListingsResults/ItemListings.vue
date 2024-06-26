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

<script setup>
import EachListing from "@/components/ListingsResults/EachListing.vue";
import { useListingsStore } from "@/stores/listings.js";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const listingsStore = useListingsStore();
onMounted(listingsStore.FETCH_LISTINGS);
const route = useRoute();

const currentPage = computed(() => Number.parseInt(route.query.page) || 1);
const previousPage = computed(() => (1 < currentPage.value ? currentPage.value - 1 : undefined));

const FILTERED_LISTINGS = computed(() => listingsStore.FILTERED_LISTINGS);
const nextPage = computed(() => {
  const listingsPerPage = 10;
  const maxPage = Math.ceil(FILTERED_LISTINGS.value.length / listingsPerPage);
  return maxPage > currentPage.value ? currentPage.value + 1 : undefined;
});

const displayedListings = computed(() => {
  const pageNumber = currentPage.value;
  const firstListingPos = (pageNumber - 1) * 10;
  const lastListingPos = pageNumber * 10;
  return FILTERED_LISTINGS.value.slice(firstListingPos, lastListingPos);
});
</script>
