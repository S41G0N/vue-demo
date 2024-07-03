<template>
  <div>Set Page {{ currentSetID }}</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const currentSetID = computed(() => route.params.set_id);
</script>
