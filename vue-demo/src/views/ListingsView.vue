<template>
  <div class="flex flex-row flex-nowrap w-full">
    <listings-filter-sidebar />
    <item-listings />
  </div>
</template>

<script lang="ts" setup>
import ListingsFilterSidebar from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebar.vue";
import ItemListings from "@/components/ListingsResults/ItemListings.vue";
</script>
