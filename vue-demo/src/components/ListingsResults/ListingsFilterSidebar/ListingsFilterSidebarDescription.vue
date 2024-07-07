<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="descriptionSearchTerm"
      type="text"
      class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="Darth Vader, Medieval Castle"
    />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
const userStore = useUserStore();

const descriptionSearchTerm = computed({
  get() {
    return userStore.descriptionSearchTerm;
  },
  set(value: string) {
    userStore.UPDATE_DESCRIPTION_SEARCH_TERM(value);
  }
});
</script>
