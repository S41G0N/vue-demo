<template>
  <img :src="imageLink" class="h-8 w-8 rounded-3xl object-contain" alt="User profile image" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
const imageLink = ref(
  "https://png.pngitem.com/pimgs/s/41-415224_donald-trump-his-children-and-500-potential-conflicts.png"
);
</script>
