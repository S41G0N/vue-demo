<template>
  <li class="mb-7">
    <router-link
      :to="listingPageLink"
      class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray"
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pt-5 pb-2">
        <h2 class="mb-2 text-2xl">{{ listingObject.title }}</h2>

        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>$200</span>
          </div>
          <div>
            <span> {{ listingObject.locations[0] }}</span>
          </div>
        </div>
      </div>

      <div class="px-8 py-4">
        <div>
          <h3 class="mt-1 mb-2">Details:</h3>
          <div>
            <ul class="list-disc pl-8">
              <li v-for="detail in getDetails()" :key="detail.id">
                {{ detail }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-2 text-center">
          <router-link :to="listingPageLink" class="text-brand-blue-1"> Expand </router-link>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  listingObject: { type: Object, required: true }
});

const listingPageLink = computed(() => "/sets/listings/" + props.listingObject.id);
const getDetails = () => props.listingObject.description;
</script>
