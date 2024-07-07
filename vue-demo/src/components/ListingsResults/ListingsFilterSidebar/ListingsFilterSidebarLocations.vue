<template>
  <collapsible-accordion header="Location">
    <listings-filter-sidebar-checkbox-group
      :available-filters="UNIQUE_LOCATION"
      :action="userStore.ADD_SELECTED_LOCATION"
    ></listings-filter-sidebar-checkbox-group>
  </collapsible-accordion>
</template>

<script lang="ts" setup>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import ListingsFilterSidebarCheckboxGroup from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarCheckboxGroup.vue";
import { useUserStore } from "@/stores/user";
import { useLocationsStore } from "@/stores/locations";
import { computed } from "vue";

const locationStore = useLocationsStore();
const UNIQUE_LOCATION = computed(() => locationStore.UNIQUE_LOCATIONS);

const userStore = useUserStore();
</script>
