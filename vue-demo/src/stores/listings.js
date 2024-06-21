import { defineStore } from "pinia";
import fetchListings from "@/api/fetchListings";
import { useUserStore } from "@/stores/user";

export const FETCH_LISTINGS = "FETCH_LISTINGS";
export const MINIFIG_COUNT = "MINIFIG_COUNT";
export const UNIQUE_CONDITION = "UNIQUE_CONDITION";
export const FILTERED_MINIFIGURES = "FILTERED_MINIFIGURES";
export const FILTERED_CONDITION = "FILTERED_CONDITION";
export const FILTERED_LISTINGS = "FILTERED_LISTINGS";

export const INCLUDE_LISTING_BY_CONDITION = "INCLUDE_LISTING_BY_CONDITION";
export const INCLUDE_LISTING_BY_MINIFIGS = "INCLUDE_LISTING_BY_MINIFIGS";

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

    [INCLUDE_LISTING_BY_MINIFIGS]: () => (listing) => {
      const userStore = useUserStore();
      if (userStore.selectedMinifigureFilters.length === 0) return true;
      return userStore.selectedMinifigureFilters.includes(listing.minifigCount);
    },

    [FILTERED_MINIFIGURES](state) {
      const userStore = useUserStore();

      if (userStore.selectedMinifigureFilters.length === 0) {
        return state.listings;
      }

      return state.listings.filter((listing) =>
        userStore.selectedMinifigureFilters.includes(listing.minifigCount)
      );
    },

    [UNIQUE_CONDITION](state) {
      const conditions = new Set();
      state.listings.forEach((listing) => conditions.add(listing.condition));
      return conditions;
    },

    [INCLUDE_LISTING_BY_CONDITION]: () => (listing) => {
      const userStore = useUserStore();
      if (userStore.selectedConditionFilters.length === 0) return true;
      return userStore.selectedConditionFilters.includes(listing.condition);
    },

    [FILTERED_CONDITION](state) {
      const userStore = useUserStore();

      if (userStore.selectedConditionFilters.length === 0) {
        return state.listings;
      }

      return state.listings.filter((listing) =>
        userStore.selectedConditionFilters.includes(listing.condition)
      );
    },

    [FILTERED_LISTINGS](state) {
      return state.listings
        .filter((listing) => this.INCLUDE_LISTING_BY_MINIFIGS(listing))
        .filter((listing) => this.INCLUDE_LISTING_BY_CONDITION(listing));
    }
  }
});
