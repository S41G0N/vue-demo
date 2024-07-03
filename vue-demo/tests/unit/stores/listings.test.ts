import { createPinia, setActivePinia } from "pinia";
import { useListingsStore } from "@/stores/listings";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { describe } from "vitest";
import type { Mock } from "vitest";
import { createMockListing } from "../utils/createMockListing";

vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("stores listings", () => {
    const store = useListingsStore();
    expect(store.listings).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_LISTINGS", () => {
    it("stores listings from an API request using axios", async () => {
      axiosGetMock.mockResolvedValue({ data: ["Test Listing 1", "Test Listing 2"] });
      const store = useListingsStore();
      await store.FETCH_LISTINGS();
      expect(store.listings).toEqual(["Test Listing 1", "Test Listing 2"]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("MINIFIG_COUNT", () => {
    it("Checks if minifigure filter returns unique values only", () => {
      const store = useListingsStore();
      store.listings = [
        createMockListing({ minifigCount: "1" }),
        createMockListing({ minifigCount: "1" }),
        createMockListing({ minifigCount: "1" }),
        createMockListing({ minifigCount: "2" })
      ];
      const result = store.MINIFIG_COUNT;
      expect(result).toEqual(new Set(["1", "2"]));
    });
  });

  describe("INCLUDE_LISTING_BY_MINIFIGS", () => {
    describe("when user has not selected any minifig filter", () => {
      it("returns true", () => {
        const userStore = useUserStore();
        userStore.selectedMinifigureFilters = [];

        const listingsStore = useListingsStore();
        const mock_listing = createMockListing({ minifigCount: "1" });
        expect(listingsStore.INCLUDE_LISTING_BY_MINIFIGS(mock_listing)).toEqual(true);
      });
    });

    describe("when user has selected a minifig filter", () => {
      it("returns matching listings", () => {
        const userStore = useUserStore();
        userStore.selectedMinifigureFilters = ["1"];
        const listingsStore = useListingsStore();
        const mock_listing = createMockListing({ minifigCount: "1" });
        expect(listingsStore.INCLUDE_LISTING_BY_MINIFIGS(mock_listing)).toEqual(true);
      });
    });
  });

  describe("UNIQUE_CONDITIONS", () => {
    it("identifies listings based on conditions filters", () => {
      const listingsStore = useListingsStore();
      listingsStore.listings = [
        createMockListing({ condition: "New" }),
        createMockListing({ condition: "MISB" }),
        createMockListing({ condition: "New" })
      ];

      const result = listingsStore.UNIQUE_CONDITION;

      expect(result).toEqual(new Set(["New", "MISB"]));
    });
  });

  describe("INCLUDE_LISTING_BY_CONDITION", () => {
    describe("when user has not selected any condition filter", () => {
      it("returns true", () => {
        const userStore = useUserStore();
        userStore.selectedConditionFilters = [];
        const listingsStore = useListingsStore();
        const mock_listing = createMockListing({ condition: "MISB" });
        expect(listingsStore.INCLUDE_LISTING_BY_CONDITION(mock_listing)).toEqual(true);
      });
    });

    describe("when user has selected a condition filter", () => {
      it("returns matching listings", () => {
        const userStore = useUserStore();
        userStore.selectedConditionFilters = ["MISB", "New"];
        const listingsStore = useListingsStore();
        let mock_listing = createMockListing({ condition: "MISB" });
        expect(listingsStore.INCLUDE_LISTING_BY_CONDITION(mock_listing)).toEqual(true);
        mock_listing = createMockListing({ condition: "Old" });
        expect(listingsStore.INCLUDE_LISTING_BY_CONDITION(mock_listing)).toEqual(false);
      });
    });
  });

  describe("INCLUDE_LISTING_BY_CONDITION", () => {
    it("Checks if getters return the correct result", () => {
      const store = useListingsStore();
      store.listings = [
        createMockListing({ minifigCount: "1" }),
        createMockListing({ minifigCount: "1" }),
        createMockListing({ minifigCount: "1" }),
        createMockListing({ minifigCount: "2" })
      ];
      const result = store.MINIFIG_COUNT;
      expect(result).toEqual(new Set(["1", "2"]));
    });
  });
});
