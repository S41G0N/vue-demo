import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";
import { expect } from "vitest";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("checks whether the user starts 'logged out'", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores user Minifigures selected filters", () => {
    const store = useUserStore();
    expect(store.selectedMinifigureFilters).toEqual([]);
  });

  it("stores user conditions selected filters", () => {
    const store = useUserStore();
    expect(store.selectedConditionFilters).toEqual([]);
  });

  it("stores user location selected filters", () => {
    const store = useUserStore();
    expect(store.selectedLocationFilters).toEqual([]);
  });

  it("stores stores description search term", () => {
    const store = useUserStore();
    expect(store.descriptionSearchTerm).toEqual("");
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("loginUser()", () => {
    const store = useUserStore();
    store.LOGIN_USER();
    expect(store.isLoggedIn).toBe(true);
  });

  describe("ADD_SELECTED_MINIFIGURES", () => {
    it("updates current filters based on selected minifigures", () => {
      const store = useUserStore();
      store.ADD_SELECTED_MINIFIGURES(["1", "2"]);
      expect(store.selectedMinifigureFilters).toEqual(["1", "2"]);
    });
  });

  describe("ADD_SELECTED_CONDITION", () => {
    it("updates current filters based on selected condition", () => {
      const store = useUserStore();

      store.ADD_SELECTED_CONDITION(["New", "MISB"]);

      expect(store.selectedConditionFilters).toEqual(["New", "MISB"]);
    });
  });

  describe("ADD_SELECTED_LOCATION", () => {
    it("updates current filters based on selected locations", () => {
      const store = useUserStore();
      store.ADD_SELECTED_LOCATION(["Location1", "Location2"]);
      expect(store.selectedLocationFilters).toEqual(["Location1", "Location2"]);
    });
  });

  describe("CLEAR_USER_SELECTED_FILTERS", () => {
    it("remove all currently selected filters", () => {
      const store = useUserStore();
      store.ADD_SELECTED_LOCATION(["Paris", "Lisbon"]);
      store.ADD_SELECTED_CONDITION(["MISB", "New"]);
      store.ADD_SELECTED_MINIFIGURES(["1", "2"]);
      store.CLEAR_USER_SELECTED_FILTERS();

      expect(store.selectedLocationFilters).toEqual([]);
      expect(store.selectedConditionFilters).toEqual([]);
      expect(store.selectedMinifigureFilters).toEqual([]);
      expect(store.descriptionSearchTerm).toBe("");
    });
  });

  describe("UPDATE_DESCRIPTION_SEARCH_TERM", () => {
    it("updates the search term based on user prompt", () => {
      const store = useUserStore();
      store.UPDATE_DESCRIPTION_SEARCH_TERM("Test Search Term");
      expect(store.descriptionSearchTerm).toEqual("Test Search Term");
    });
  });
});
