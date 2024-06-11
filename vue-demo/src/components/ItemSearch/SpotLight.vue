<template>
  <ul>
    <li v-for="card in cards" :key="card.id">
      <slot :title="card.title" :img="card.img" :description="card.description"></slot>
    </li>
  </ul>
</template>

<script>
import axios from "axios";

export default {
  name: "SpotLight",
  data() {
    return {
      cards: []
    };
  },
  async mounted() {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${baseUrl}/spotlights`;
    const response = await axios.get(apiUrl);
    this.cards = response.data;
    console.log(this.cards);
  }
};
</script>
