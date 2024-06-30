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

<script>
import nextElementInList from "@/utils/nextElementInList.ts";

export default {
  name: "MainHero",
  data() {
    return {
      keyword: "Build",
      interval: null
    };
  },
  computed: {
    actionClasses() {
      return {
        //Activate keyword class
        [this.keyword.toLowerCase()]: true
      };
    }
  },
  created() {
    this.changeHeroTitle();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    changeHeroTitle() {
      this.interval = setInterval(() => {
        this.keyword = nextElementInList(["Build", "Find", "Sell", "Buy"], this.keyword);
      }, 3000);
    }
  }
};
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
