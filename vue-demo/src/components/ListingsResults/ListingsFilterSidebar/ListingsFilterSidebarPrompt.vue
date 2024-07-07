<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">What are you looking for?</h3>
    <div class="flex items-center text-sm">
      <action-button
        text="Clear filters"
        type="secondary"
        @click="userStore.CLEAR_USER_SELECTED_FILTERS"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
