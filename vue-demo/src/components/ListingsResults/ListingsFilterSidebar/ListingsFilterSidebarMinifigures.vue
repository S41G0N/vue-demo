<template>
  <collapsible-accordion header="Minifigures">
    <listings-filter-sidebar-checkbox-group
      :available-filters="MINIFIG_COUNT"
      :action="userStore.ADD_SELECTED_MINIFIGURES"
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

const MINIFIG_COUNT = computed(() => listingsStore.MINIFIG_COUNT);
</script>
