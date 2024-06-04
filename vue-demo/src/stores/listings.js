import { defineStore } from "pinia";
import fetchListings from "@/api/fetchListings";

export const FETCH_LISTINGS = "FETCH_LISTINGS";
export const useListingsStore = defineStore("listings", {
  state: () => ({
    listings: []
  }),
  actions: {
    async [FETCH_LISTINGS]() {
      const listings = await fetchListings();
      this.listings = listings;
    }
  }
});
