import { defineStore } from "pinia";

export const ADD_SELECTED_MINIFIGURES = "ADD_SELECTED_MINIFIGURES";

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
    [ADD_SELECTED_MINIFIGURES](selectedFilters) {
      this.selectedMinifigureFilters = selectedFilters;
    }
  }
});
