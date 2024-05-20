<template>
  <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/sets/listings">Sets</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "App"
};
</script>
