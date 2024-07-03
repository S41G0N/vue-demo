<template>
  <ul>
    <li v-for="card in cards" :key="card.id">
      <slot :title="card.title" :img="card.img" :description="card.description"></slot>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, onMounted } from "vue";

interface Spotlight {
  id: number;
  img: string;
  title: string;
  description: string;
}

const cards = ref<Spotlight[]>([]);

const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const apiUrl = `${baseUrl}/spotlights`;
  const response = await axios.get<Spotlight[]>(apiUrl);
  cards.value = response.data;
};

onMounted(getSpotlights);
</script>
