<template>
  <form
    class="flex h-12 w-full items-center rounded-3xl border border-solid border-brand-gray-3"
    @submit.prevent="searchForItem"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />
    <div class="flex flex-1 flex-nowrap h-full text-base font-light">
      <div class="flex h-full flex-1 relative items-center pr-3">
        <label for="searchItem" class="absolute left-0 -top-10">What</label>
        <text-input id="searchItem" v-model="searchTerm" placeholder="Medieval Blacksmith" />
      </div>
      <span
        class="flex items-center h-full border-l border-r border-brand-gray-3 bg-brand-gray-2 px-3"
        >in</span
      >
      <div class="flex h-full flex-1 relative items-center pl-3">
        <label for="location" class="absolute left-0 -top-10">Where?</label>
        <text-input id="location" v-model="location" placeholder="Amsterdam" />
      </div>
    </div>

    <action-button text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue";
import TextInput from "@/components/Shared/TextInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchTerm = ref("");
const location = ref("");
const router = useRouter();

const searchForItem = () => {
  router.push({
    name: "Listings",
    query: {
      item: searchTerm.value,
      location: location.value
    }
  });
};
</script>
