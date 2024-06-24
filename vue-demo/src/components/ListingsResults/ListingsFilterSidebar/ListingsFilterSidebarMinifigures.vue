<template>
  <collapsible-accordion header="Minifigures">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="filter in MINIFIG_COUNT" :key="filter" class="h-8 w-1/2">
            <input
              :id="filter"
              v-model="selectedMinifigureFilters"
              :value="filter"
              type="checkbox"
              class="mr-3"
              @change="selectFilter"
            />
            <label :for="filter"> {{ filter }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script setup>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

import { useListingsStore } from "@/stores/listings";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const selectedMinifigureFilters = ref([]);
const listingsStore = useListingsStore();
const userStore = useUserStore();
const MINIFIG_COUNT = computed(() => listingsStore.MINIFIG_COUNT);
const router = useRouter();

const selectFilter = () => {
  userStore.ADD_SELECTED_MINIFIGURES(selectedMinifigureFilters.value);
  router.push({ name: "Listings" });
};
</script>
