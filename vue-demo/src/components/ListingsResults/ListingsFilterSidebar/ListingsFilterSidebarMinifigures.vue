<template>
  <collapsible-accordion header="Minifigures">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="filter in MINIFIG_COUNT" :key="filter" class="h-8 w-1/2">
            <input
              :id="filter"
              v-model="selectedFilters"
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

<script>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

import { mapActions, mapState } from "pinia";
import { useListingsStore, MINIFIG_COUNT } from "@/stores/listings";
import { useUserStore, ADD_SELECTED_FILTERS } from "@/stores/user";

export default {
  name: "ListingsFilterSidebarMinifigures",
  components: {
    CollapsibleAccordion
  },
  props: {},
  data() {
    return {
      selectedFilters: []
    };
  },
  computed: {
    ...mapState(useListingsStore, [MINIFIG_COUNT])
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_FILTERS]),
    selectFilter() {
      this.ADD_SELECTED_FILTERS(this.selectedFilters);
    }
  }
};
</script>
