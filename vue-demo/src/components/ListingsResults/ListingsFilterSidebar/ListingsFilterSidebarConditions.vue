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

<script>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

import { mapActions, mapState } from "pinia";
import { useListingsStore, UNIQUE_CONDITION } from "@/stores/listings";
import { useUserStore, ADD_SELECTED_CONDITION } from "@/stores/user";

export default {
  name: "ListingsFilterSidebarConditions",
  components: {
    CollapsibleAccordion
  },
  props: {},
  data() {
    return {
      selectedConditionFilters: []
    };
  },
  computed: {
    ...mapState(useListingsStore, [UNIQUE_CONDITION])
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_CONDITION]),
    selectFilter() {
      this.ADD_SELECTED_CONDITION(this.selectedConditionFilters);
      this.$router.push({ name: "Listings" });
    }
  }
};
</script>
