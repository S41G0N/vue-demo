<template>
  <main>
    <section class="flex flex-col h-screen bg-yellow-200 pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-start-1 col-span-1 border border-black">1 COL</div>
        <div class="col-start-2 col-span-5 border border-black"><main-headline /></div>
        <div class="col-start-7 col-span-5 border border-black">5 COL</div>
        <div class="col-start-12 col-span-1 border border-black">1 COL</div>
      </div>
    </section>
  </main>
</template>

<script>
import MainHeadline from "@/components/MainHeadline.vue";
export default {
  name: "MainHero",
  components: {
    MainHeadline
  }
};
</script>
