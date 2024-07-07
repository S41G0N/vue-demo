<template>
  <collapsible-accordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="filter in availableFilters" :key="filter" class="h-8 w-1/2">
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

<script lang="ts" setup>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const props = defineProps({
  header: {
    type: String,
    required: true
  },
  availableFilters: {
    type: [Set<string>, Array<string>],
    required: true
  },
  action: {
    type: Function,
    required: true
  }
});

const selectedFilters = ref<string[]>([]);
const router = useRouter();

const selectFilter = () => {
  props.action(selectedFilters.value);
  router.push({ name: "Listings" });
};
</script>
