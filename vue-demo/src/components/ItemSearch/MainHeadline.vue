<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ keyword }} </span>
      <br />
      your bricks
    </h1>
    <h2 class="text-3xl font-light">Thousands of bricks. One marketplace.</h2>
  </section>
</template>

<script lang="ts" setup>
import nextElementInList from "@/utils/nextElementInList.ts";
import { onMounted, onBeforeUnmount, ref, computed } from "vue";

const keyword = ref("Build");
const interval = ref<ReturnType<typeof setInterval>>();

const actionClasses = computed(() => {
  return {
    //Activate keyword class
    [keyword.value.toLowerCase()]: true
  };
});

const changeHeroTitle = () => {
  interval.value = setInterval(() => {
    keyword.value = nextElementInList(["Build", "Find", "Sell", "Buy"], keyword.value);
  }, 3000);
};

onMounted(changeHeroTitle);
onBeforeUnmount(() => clearInterval(interval.value));
</script>

<style scoped>
.build {
  color: #1a73e8;
}
.find {
  color: #34a853;
}
.sell {
  color: #f9ab00;
}
.buy {
  color: #d93025;
}
</style>
