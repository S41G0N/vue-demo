import fetchListings from "@/api/fetchListings";
import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";

import type { Listing, Location } from "@/api/types";

export const FETCH_LISTINGS = "FETCH_LISTINGS";
export const MINIFIG_COUNT = "MINIFIG_COUNT";
export const UNIQUE_CONDITION = "UNIQUE_CONDITION";
export const FILTERED_LISTINGS = "FILTERED_LISTINGS";

export const INCLUDE_LISTING_BY_CONDITION = "INCLUDE_LISTING_BY_CONDITION";
export const INCLUDE_LISTING_BY_MINIFIGS = "INCLUDE_LISTING_BY_MINIFIGS";
export const INCLUDE_LISTING_BY_LOCATION = "INCLUDE_LISTING_BY_LOCATION";

export interface ListingState {
  listings: Listing[];
}

export const useListingsStore = defineStore("listings", {
  state: (): ListingState => ({
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
      const minifigCount = new Set<string>();
      state.listings.forEach((listing: Listing) => minifigCount.add(listing.minifigCount));
      return minifigCount;
    },

    [INCLUDE_LISTING_BY_MINIFIGS]: () => (listing: Listing) => {
      const userStore = useUserStore();
      if (userStore.selectedMinifigureFilters.length === 0) return true;
      return userStore.selectedMinifigureFilters.includes(listing.minifigCount);
    },

    [UNIQUE_CONDITION](state) {
      const conditions = new Set<string>();
      state.listings.forEach((listing: Listing) => conditions.add(listing.condition));
      return conditions;
    },

    [INCLUDE_LISTING_BY_CONDITION]: () => (listing: Listing) => {
      const userStore = useUserStore();
      if (userStore.selectedConditionFilters.length === 0) return true;
      return userStore.selectedConditionFilters.includes(listing.condition);
    },

    [INCLUDE_LISTING_BY_LOCATION]: () => (listing: Location) => {
      const userStore = useUserStore();
      if (userStore.selectedLocationFilters.length === 0) return true;
      return userStore.selectedLocationFilters.includes(listing.locations[0]);
    },

    [FILTERED_LISTINGS](state): Listing[] {
      return state.listings
        .filter((listing) => this.INCLUDE_LISTING_BY_MINIFIGS(listing))
        .filter((listing) => this.INCLUDE_LISTING_BY_CONDITION(listing))
        .filter((listing) => this.INCLUDE_LISTING_BY_LOCATION(listing));
    }
  }
});
