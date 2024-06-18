import { defineStore } from "pinia";

export const ADD_SELECTED_MINIFIGURES = "ADD_SELECTED_MINIFIGURES";
export const ADD_SELECTED_CONDITION = "ADD_SELECTED_CONDITION";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    selectedMinifigureFilters: [],
    selectedConditionFilters: []
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_MINIFIGURES](selectedFilters) {
      this.selectedMinifigureFilters = selectedFilters;
    },

    [ADD_SELECTED_CONDITION](selectedCondition) {
      this.selectedConditionFilters = selectedCondition;
    }
  }
});
