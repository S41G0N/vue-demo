<template>
  <div class="border-b border-solid border-brand-gray-2">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between h-12"
      role="button"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
    <div v-if="isOpen" class="mt-5 w-full">
      <slot> <p>Backup Content</p> </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

defineProps({ header: { type: String, required: true } });

const isOpen = ref(false);

const open = () => {
  isOpen.value = !isOpen.value;
};

const caretIcon = computed(() => (isOpen.value ? "magnifying-glass" : "angle-down"));
</script>
