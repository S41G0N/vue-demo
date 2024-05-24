<template>
  <div>Set Page {{ currentSetID }}</div>
</template>

<script>
export default {
  name: "SetView",
  computed: {
    currentSetID() {
      return this.$route.params.set_id; //set_id defined in router index.js
    }
  }
};
</script>
