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

<script lang="ts" setup>
import EachListing from "@/components/ListingsResults/EachListing.vue";
import { useListingsStore } from "@/stores/listings";
import { useLocationsStore } from "@/stores/locations";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import getPreviousOrNextPage from "@/composables/getPreviousOrNextPage";

const listingsStore = useListingsStore();
onMounted(listingsStore.FETCH_LISTINGS);

const locationsStore = useLocationsStore();
onMounted(locationsStore.FETCH_LOCATIONS);

const route = useRoute();

const FILTERED_LISTINGS = computed(() => listingsStore.FILTERED_LISTINGS);
const listingsPerPage = 10;
const currentPage = computed(() => Number.parseInt(route.query.page as string) || 1);
const maxPage = computed(() => Math.ceil(FILTERED_LISTINGS.value.length / listingsPerPage));

const { previousPage, nextPage } = getPreviousOrNextPage(currentPage, maxPage);

const displayedListings = computed(() => {
  const pageNumber = currentPage.value;
  const firstListingPos = (pageNumber - 1) * 10;
  const lastListingPos = pageNumber * 10;
  return FILTERED_LISTINGS.value.slice(firstListingPos, lastListingPos);
});
</script>
