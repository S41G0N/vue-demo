<template>
  <header class="w-full text-sm">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div class="flex flex-nowrap h-full border-b border-solid border-brand-gray-1 px-8">
        <a href="/" class="flex h-full items-center text-xl">{{ company.name }}</a>
        <h2 class="ml-8 flex h-full items-center">{{ company.slogan }}</h2>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "MainNav",
  data() {
    return {
      company: {
        name: "Brickie",
        slogan: "The value of each brick"
      }
    }
  }
}
</script>
