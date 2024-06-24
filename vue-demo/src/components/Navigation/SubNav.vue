<template>
  <div class="w-full h-16 border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex items-center h-full px-8">
      <div v-if="onSetsListingsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span>
          <span class="text-brand-green-1"> {{ FILTERED_LISTINGS.length }} </span> jobs matched
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useListingsStore } from "@/stores/listings";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const onSetsListingsPage = computed(() => {
  return route.name === "Listings";
});

const listingsStore = useListingsStore();
const FILTERED_LISTINGS = computed(() => listingsStore.FILTERED_LISTINGS);
</script>
