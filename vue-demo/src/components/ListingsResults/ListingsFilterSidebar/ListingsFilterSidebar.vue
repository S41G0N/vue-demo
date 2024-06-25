<template>
  <div class="flex flex-col border-r border-solid border-brand-gray-1 bg-white p-4 w-96">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What are you looking for?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear filters" type="secondary" />
        </div>
      </div>

      <listings-filter-sidebar-checkbox-group
        header="Minifigures"
        :available-filters="MINIFIG_COUNT"
        :action="userStore.ADD_SELECTED_MINIFIGURES"
      ></listings-filter-sidebar-checkbox-group>

      <listings-filter-sidebar-checkbox-group
        header="Condition"
        :available-filters="UNIQUE_CONDITION"
        :action="userStore.ADD_SELECTED_CONDITION"
      ></listings-filter-sidebar-checkbox-group>

      <collapsible-accordion header="Themes">
        <div class="mt-5">
          <fieldset>
            <ul class="flex flex-row flex-wrap">
              <li class="h-8 w-1/2">
                <input id="Test" type="checkbox" class="mr-3" />
                <label for="Test">Test</label>
              </li>
              <li class="h-8 w-1/2">
                <input id="Test2" type="checkbox" class="mr-3" />
                <label for="Test2">Test2</label>
              </li>
              <li class="h-8 w-1/2">
                <input id="Test3" type="checkbox" class="mr-3" />
                <label for="Test3">Test3</label>
              </li>
              <li class="h-8 w-1/2">
                <input id="Test4" type="checkbox" class="mr-3" />
                <label for="Test4">Test4</label>
              </li>
            </ul>
          </fieldset>
        </div>
      </collapsible-accordion>
      <collapsible-accordion header="Price"> </collapsible-accordion>
    </section>
  </div>
</template>

<script setup>
import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import ListingsFilterSidebarCheckboxGroup from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarCheckboxGroup.vue";
import { useListingsStore } from "@/stores/listings";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const listingsStore = useListingsStore();
const MINIFIG_COUNT = computed(() => listingsStore.MINIFIG_COUNT);
const UNIQUE_CONDITION = computed(() => listingsStore.UNIQUE_CONDITION);

const userStore = useUserStore();
</script>
