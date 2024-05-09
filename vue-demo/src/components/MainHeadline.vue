<template>
  <section>
    <h1>
      <span :class="actionClasses">{{ keyword }} </span>
      your bricks
    </h1>
    <h2>Everything you need for your brick passion</h2>
  </section>
</template>

<script>
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
        build: this.keyword === "Build",
        find: this.keyword === "Find",
        sell: this.keyword === "Sell",
        buy: this.keyword === "Buy"
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
        const keywords = ["Build", "Find", "Sell", "Buy"];
        const currentKeyword = keywords.indexOf(this.keyword);
        const nextKeyword = (currentKeyword + 1) % 4;
        this.keyword = keywords[nextKeyword];
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
