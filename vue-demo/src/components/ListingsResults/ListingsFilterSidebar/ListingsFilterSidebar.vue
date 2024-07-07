<template>
  <div class="flex flex-col border-r border-solid border-brand-gray-1 bg-white p-4 w-96">
    <section class="pb-5">
      <listings-filter-sidebar-prompt />
      <listings-filter-sidebar-description />
      <listings-filter-sidebar-minifigures />
      <listings-filter-sidebar-conditions />
      <listings-filter-sidebar-locations />
      <listings-filter-sidebar-themes />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";

import ListingsFilterSidebarPrompt from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarPrompt.vue";
import ListingsFilterSidebarDescription from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarDescription.vue";
import ListingsFilterSidebarMinifigures from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarMinifigures.vue";
import ListingsFilterSidebarConditions from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarConditions.vue";
import ListingsFilterSidebarLocations from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarLocations.vue";
import ListingsFilterSidebarThemes from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarThemes.vue";

const route = useRoute();
const userStore = useUserStore();

const parseDescriptionSearchTerm = () => {
  const searchTerm = (route.query.item as string) || "";
  userStore.UPDATE_DESCRIPTION_SEARCH_TERM(searchTerm);
};

onMounted(parseDescriptionSearchTerm);
</script>
