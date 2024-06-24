<template>
  <collapsible-accordion header="Conditions">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="filter in UNIQUE_CONDITION" :key="filter" class="h-8 w-1/2">
            <input
              :id="filter"
              v-model="selectedConditionFilters"
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const selectedConditionFilters = ref([]);
const listingsStore = useListingsStore();
const userStore = useUserStore();

const UNIQUE_CONDITION = computed(() => listingsStore.UNIQUE_CONDITION);
const router = useRouter();

const selectFilter = () => {
  userStore.ADD_SELECTED_CONDITION(selectedConditionFilters.value);
  router.push({ name: "Listings" });
};
</script>
