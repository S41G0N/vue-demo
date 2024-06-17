import { defineStore } from "pinia";
import fetchListings from "@/api/fetchListings";
import { useUserStore } from "@/stores/user";

export const FETCH_LISTINGS = "FETCH_LISTINGS";
export const MINIFIG_COUNT = "MINIFIG_COUNT";
export const FILTERED_MINIFIGURES = "FILTERED_MINIFIGURES";

export const useListingsStore = defineStore("listings", {
  state: () => ({
    listings: []
  }),
  actions: {
    async [FETCH_LISTINGS]() {
      const listings = await fetchListings();
      this.listings = listings;
    }
  },

  getters: {
    [MINIFIG_COUNT](state) {
      const minifigCount = new Set();
      state.listings.forEach((listing) => minifigCount.add(listing.minifigCount));
      return minifigCount;
    },

    [FILTERED_MINIFIGURES](state) {
      const userStore = useUserStore();
      if (userStore.selectedMinifigureFilters.length === 0) {
        return state.listings;
      }
      return state.listings.filter((listing) =>
        userStore.selectedMinifigureFilters.includes(listing.minifigCount)
      );
    }
  }
});
