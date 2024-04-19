<template>
  <MainNav />
</template>

<script>
import MainNav from '@/components/MainNav.vue'
export default {
  name: 'App',
  components: {
    // Could be simplified in a single line as MainNav,
    // Could also be referenced to as main-nav in kebab-case (Vue does that automatically)
    MainNav: MainNav
  }
}
</script>
