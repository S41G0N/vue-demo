import { defineStore } from "pinia";
import type { Location } from "@/api/types";
import { ref, computed } from "vue";
import fetchLocations from "@/api/fetchLocations";

export const useLocationsStore = defineStore("locations", () => {
  const locations = ref<Location[]>([]);

  const FETCH_LOCATIONS = async () => {
    const retrievedLocations = await fetchLocations();
    locations.value = retrievedLocations;
  };

  const UNIQUE_LOCATIONS = computed(() =>
    locations.value.map((each_location_object) => each_location_object.locations)
  );

  return { locations, FETCH_LOCATIONS, UNIQUE_LOCATIONS };
});
