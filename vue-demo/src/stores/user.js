import { defineStore } from "pinia";

export const ADD_SELECTED_FILTERS = "ADD_SELECTED_FILTERS";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    selectedFilter: []
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    async [ADD_SELECTED_FILTERS](selectedFilters) {
      this.selectedFilter = selectedFilters;
    }
  }
});
