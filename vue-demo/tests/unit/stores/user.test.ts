import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";
import { expect } from "vitest";

describe("Check default login status", () => {
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
});

describe("Login user", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("tries to login user by updating login status", () => {
    const store = useUserStore();
    store.loginUser();
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
      console.log(store.selectedConditionFilters);

      expect(store.selectedConditionFilters).toEqual(["New", "MISB"]);
    });
  });
});
