<template>
  <MainNav />
  <MainHero />
</template>

<script>
import MainNav from "@/components/MainNav.vue";
import MainHero from "@/components/MainHero.vue";
export default {
  name: "App",
  components: {
    MainNav,
    MainHero
  }
};
</script>
