<template>
  <header-container>
    <template #title>
      <h1 class="w-full text-4xl font-normal">My title</h1>
    </template>
    <template #subtitle>
      <h2 class="my-4 w-full text-base font-light">My subtitle</h2>
    </template>
  </header-container>
</template>
<script lang="ts" setup>
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";
</script>
