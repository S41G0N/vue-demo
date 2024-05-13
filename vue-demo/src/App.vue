<template>
  <MainNav />
  <MainHero />
</template>

<script>
import MainNav from "@/components/Navigation/MainNav.vue";
import MainHero from "@/components/ItemSearch/MainHero.vue";
export default {
  name: "App",
  components: {
    MainNav,
    MainHero
  }
};
</script>
