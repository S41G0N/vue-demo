import { defineStore } from "pinia";
import { ref } from "vue";

export const ADD_SELECTED_MINIFIGURES = "ADD_SELECTED_MINIFIGURES";
export const ADD_SELECTED_CONDITION = "ADD_SELECTED_CONDITION";
export const ADD_SELECTED_LOCATION = "ADD_SELECTED_LOCATION";
export const CLEAR_USER_SELECTED_FILTERS = "CLEAR_USER_SELECTED_FILTERS";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const selectedMinifigureFilters = ref<string[]>([]);
  const selectedConditionFilters = ref<string[]>([]);
  const selectedLocationFilters = ref<string[]>([]);

  const LOGIN_USER = () => {
    isLoggedIn.value = true;
  };

  const ADD_SELECTED_MINIFIGURES = (selectedFilters: string[]) => {
    selectedMinifigureFilters.value = selectedFilters;
  };

  const ADD_SELECTED_CONDITION = (selectedFilters: string[]) => {
    selectedConditionFilters.value = selectedFilters;
  };

  const ADD_SELECTED_LOCATION = (selectedFilters: string[]) => {
    selectedLocationFilters.value = selectedFilters;
  };

  const CLEAR_USER_SELECTED_FILTERS = () => {
    selectedMinifigureFilters.value = [];
    selectedConditionFilters.value = [];
    selectedLocationFilters.value = [];
  };

  return {
    isLoggedIn,
    selectedConditionFilters,
    selectedMinifigureFilters,
    selectedLocationFilters,
    LOGIN_USER,
    ADD_SELECTED_MINIFIGURES,
    ADD_SELECTED_CONDITION,
    ADD_SELECTED_LOCATION,
    CLEAR_USER_SELECTED_FILTERS
  };
});
