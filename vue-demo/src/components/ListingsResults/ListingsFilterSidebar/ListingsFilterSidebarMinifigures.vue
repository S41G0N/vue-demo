<template>
  <collapsible-accordion header="Minifigures">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="filter in MINIFIG_COUNT" :key="filter" class="h-8 w-1/2">
            <input :id="filter" type="checkbox" class="mr-3" />
            <label :for="filter"> {{ filter }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

import { mapState } from "pinia";
import { useListingsStore, MINIFIG_COUNT } from "@/stores/listings";

export default {
  name: "ListingsFilterSidebarMinifigures",
  components: {
    CollapsibleAccordion
  },
  props: {},
  computed: {
    ...mapState(useListingsStore, [MINIFIG_COUNT])
  }
};
</script>
