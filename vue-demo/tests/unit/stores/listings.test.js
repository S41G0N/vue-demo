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

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("MINIFIG_COUNT", () => {
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
    });
  });

  describe("UNIQUE_CONDITIONS", () => {
    it("identifies listings based on conditions filters", () => {
      const listingsStore = useListingsStore();
      listingsStore.listings = [{ condition: "New" }, { condition: "MISB" }, { condition: "New" }];

      const result = listingsStore.UNIQUE_CONDITION;

      expect(result).toEqual(new Set(["New", "MISB"]));
    });
  });

  describe("FILTERED_CONDITION", () => {
    it("identifies listings based on condition filters", () => {
      const listingsStore = useListingsStore();
      listingsStore.listings = [
        { condition: "New" },
        { condition: "MISB" },
        { condition: "New" },
        { condition: "Old" }
      ];

      const userStore = useUserStore();
      userStore.ADD_SELECTED_CONDITION(["MISB", "Old"]);

      const result = listingsStore.FILTERED_CONDITION;
      console.log("Filtered Minifigures:", result);
      expect(result).toEqual([{ condition: "MISB" }, { condition: "Old" }]);

      describe("when no filter selected", () => {
        it("fetches all listings", () => {
          const listingsStore = useListingsStore();

          listingsStore.listings = [
            { condition: "New" },
            { condition: "MISB" },
            { condition: "New" },
            { condition: "Old" }
          ];

          const userStore = useUserStore();
          userStore.selectedConditionFilters = [];
          const result = listingsStore.FILTERED_CONDITION;
          expect(result).toEqual([
            { condition: "New" },
            { condition: "MISB" },
            { condition: "New" },
            { condition: "Old" }
          ]);
        });
      });
    });
  });

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
      userStore.ADD_SELECTED_MINIFIGURES([1, 2]);

      console.log("selectedMinifigureFilters", userStore.selectedMinifigureFilters);
      //userStore.selectedMinifigureFilters = [];

      const result = listingsStore.FILTERED_MINIFIGURES;
      console.log("Filtered Minifigures:", result);
      expect(result).toEqual([{ minifigCount: 1 }, { minifigCount: 1 }, { minifigCount: 2 }]);
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
        userStore.selectedMinifigureFilters = [];
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
