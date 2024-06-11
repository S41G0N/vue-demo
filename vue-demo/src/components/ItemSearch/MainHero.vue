<template>
  <main class="flex flex-col h-screen">
    <section class="pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-start-1 col-span-1"></div>
        <div class="col-start-2 col-span-5">
          <main-headline />
          <item-search-form />
        </div>
        <div class="col-start-7 col-span-5 self-center justify-self-center">
          <img class="h-100 w-100 object-contain" src="@/img/bricks.webp" />
        </div>
        <div class="col-start-12 col-span-1"></div>
      </div>
    </section>
    <SpotLight class="flex flex-row justify-center pb-16">
      <template #default="cards">
        <RouterLink
          to="/sets/listings"
          class="mx-5 flex flex-col h-96 w-72 rounded-lg border bg-brand-gray-2"
        >
          <img :src="cards.img" class="object-contain" />
          <div class="mt-3 h-48 px-6 py-4">
            <h3 class="text-lg font-medium">{{ cards.title }}</h3>
            <p class="mt-3 text-sm">{{ cards.description }}</p>
          </div>
          <RouterLink to="/sets/listings" class="px-6 pb-4 text-sm text-brand-blue-1"
            >See listings</RouterLink
          >
        </RouterLink>
      </template>
    </SpotLight>
  </main>
</template>

<script>
import MainHeadline from "@/components/ItemSearch/MainHeadline.vue";
import ItemSearchForm from "@/components/ItemSearch/ItemSearchForm.vue";
import SpotLight from "@/components/ItemSearch/SpotLight.vue";

export default {
  name: "MainHero",
  components: {
    MainHeadline,
    ItemSearchForm,
    SpotLight
  }
};
</script>
