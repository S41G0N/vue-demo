<template>
  <ul>
    <li v-for="card in cards" :key="card.id">
      <slot :title="card.title" :img="card.img" :description="card.description"></slot>
    </li>
  </ul>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const cards = ref([]);

const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const apiUrl = `${baseUrl}/spotlights`;
  const response = await axios.get(apiUrl);
  cards.value = response.data;
};

onMounted(getSpotlights);
</script>
