import { createPinia, setActivePinia } from "pinia";
import { useListingsStore } from "@/stores/listings";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("stores listings", () => {
    const store = useListingsStore();
    expect(store.listings).toEqual([]);
  });
});
