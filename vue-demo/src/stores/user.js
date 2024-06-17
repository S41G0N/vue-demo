import { defineStore } from "pinia";

export const ADD_SELECTED_FILTERS = "ADD_SELECTED_FILTERS";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    selectedMinifigureFilters: [],
    selectedLocationsFilters: []
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    async [ADD_SELECTED_FILTERS](selectedMinifigureFilters) {
      this.selectedMinifigureFilters = selectedMinifigureFilters;
    }
  }
});
