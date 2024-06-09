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
<script>
export default {
  name: "CollapsibleAccordion",
  props: { header: { type: String, required: true } },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    caretIcon() {
      console.log(this.isOpen);
      return this.isOpen ? "magnifying-glass" : "angle-down";
    }
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
