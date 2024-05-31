<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div class="flex flex-nowrap h-full border-b border-solid border-brand-gray-1 px-8">
        <router-link :to="{ name: 'Home' }" class="flex h-full items-center text-xl">
          Brickie
        </router-link>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="item in menuItems" :key="item.text" class="h-full ml-9 first:ml-0">
              <router-link :to="item.url" class="flex h-full items-center py=2.5">{{
                item.text
              }}</router-link>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLoggedIn" />
          <action-button v-else text="Sign in" type="primary" @click="loginUser" />
        </div>
      </div>
      <sub-nav v-if="isLoggedIn"></sub-nav>
    </div>
  </header>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import SubNav from "@/components/Navigation/SubNav.vue";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    SubNav
  },
  data() {
    return {
      menuItems: [
        { text: "Sets", url: "/sets/listings" },
        { text: "Minifigures", url: "/" },
        { text: "Deals", url: "/" },
        { text: "News", url: "/" },
        { text: "Inventory", url: "/" },
        { text: "About Us", url: "/" }
      ]
    };
  },
  computed: {
    // Creates this.userStore that can be accessed
    ...mapState(useUserStore, ["isLoggedIn"]),

    // SETS OFFSET OF HERO DEPENDING ON LOGIN STATUS
    headerHeightClass() {
      return {
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn
      };
    }
  },
  methods: {
    ...mapActions(useUserStore, ["loginUser"])
  }
};
</script>
