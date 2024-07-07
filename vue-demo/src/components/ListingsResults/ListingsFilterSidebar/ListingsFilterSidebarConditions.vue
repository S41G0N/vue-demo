<template>
  <collapsible-accordion header="Condition">
    <listings-filter-sidebar-checkbox-group
      :available-filters="UNIQUE_CONDITION"
      :action="userStore.ADD_SELECTED_CONDITION"
    ></listings-filter-sidebar-checkbox-group>
  </collapsible-accordion>
</template>

<script lang="ts" setup>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import ListingsFilterSidebarCheckboxGroup from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarCheckboxGroup.vue";
import { useListingsStore } from "@/stores/listings";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const listingsStore = useListingsStore();
const userStore = useUserStore();
const UNIQUE_CONDITION = computed(() => listingsStore.UNIQUE_CONDITION);
</script>
