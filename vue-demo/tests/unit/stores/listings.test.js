import { createPinia, setActivePinia } from "pinia";
import { useListingsStore } from "@/stores/listings";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { describe } from "vitest";

vi.mock("axios");

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
      axios.get.mockResolvedValue({ data: ["Test Listing 1", "Test Listing 2"] });
      const store = useListingsStore();
      await store.FETCH_LISTINGS();
      expect(store.listings).toEqual(["Test Listing 1", "Test Listing 2"]);
    });
  });
});

describe("MINIFIG_COUNT", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("Checks if getters return the correct result", () => {
    const store = useListingsStore();
    store.listings = [
      { minifigCount: 1 },
      { minifigCount: 1 },
      { minifigCount: 1 },
      { minifigCount: 2 }
    ];
    const result = store.MINIFIG_COUNT;
    expect(result).toEqual(new Set([1, 2]));

    describe("FILTERED_MINIFIGURES", () => {
      it("identifies listings based on minifigure filters", () => {
        const listingsStore = useListingsStore();
        listingsStore.listings = [
          { minifigCount: 1 },
          { minifigCount: 1 },
          { minifigCount: 2 },
          { minifigCount: 3 }
        ];
        const userStore = useUserStore();
        userStore.selectedFilter = [{ minifigCount: 1 }, { minifigCount: 2 }];
        const result = listingsStore.FILTERED_MINIFIGURES;
        expect(result).toEqual([{ minifigCount: 1 }, { minifigCount: 2 }]);
      });

      describe("when no filter selected", () => {
        it("fetches all listings", () => {
          const listingsStore = useListingsStore();
          listingsStore.listings = [
            { minifigCount: 1 },
            { minifigCount: 1 },
            { minifigCount: 2 },
            { minifigCount: 3 }
          ];
          const userStore = useUserStore();
          userStore.selectedFilter = [];
          const result = listingsStore.FILTERED_MINIFIGURES;
          expect(result).toEqual([
            { minifigCount: 1 },
            { minifigCount: 1 },
            { minifigCount: 2 },
            { minifigCount: 3 }
          ]);
        });
      });
    });
  });
});
