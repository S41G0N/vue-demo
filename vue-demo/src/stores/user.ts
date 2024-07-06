import { defineStore } from "pinia";

export const ADD_SELECTED_MINIFIGURES = "ADD_SELECTED_MINIFIGURES";
export const ADD_SELECTED_CONDITION = "ADD_SELECTED_CONDITION";
export const ADD_SELECTED_LOCATION = "ADD_SELECTED_LOCATION";

export interface UserState {
  isLoggedIn: boolean;
  selectedMinifigureFilters: string[];
  selectedConditionFilters: string[];
  selectedLocationFilters: string[];
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    isLoggedIn: false,
    selectedMinifigureFilters: [],
    selectedConditionFilters: [],
    selectedLocationFilters: []
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_MINIFIGURES](selectedFilters: string[]) {
      this.selectedMinifigureFilters = selectedFilters;
    },

    [ADD_SELECTED_CONDITION](selectedCondition: string[]) {
      this.selectedConditionFilters = selectedCondition;
    },

    [ADD_SELECTED_LOCATION](selectedLocation: string[]) {
      this.selectedLocationFilters = selectedLocation;
    }
  }
});
