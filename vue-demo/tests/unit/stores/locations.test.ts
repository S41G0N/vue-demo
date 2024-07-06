import { useLocationsStore } from "@/stores/locations";
import { createPinia, setActivePinia } from "pinia";
import { expect } from "vitest";
import axios from "axios";
import type { Mock } from "vitest";
import { createMockLocation } from "../utils/createMockLocation";

vi.mock("axios");

const getMockAxios = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("stores locations that each listing might contain", () => {
    const store = useLocationsStore();
    expect(store.locations).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_LOCATIONS", () => {
    it("retrieves a list of locations using an API request", async () => {
      getMockAxios.mockResolvedValue({
        data: [
          {
            id: 1,
            locations: ["Munich"]
          }
        ]
      });

      const store = useLocationsStore();
      await store.FETCH_LOCATIONS();

      expect(store.locations).toEqual([
        {
          id: 1,
          locations: ["Munich"]
        }
      ]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_LOCATIONS", () => {
    it("extracts unique locations from a collection of locations", async () => {
      const store = useLocationsStore();
      store.locations = [
        createMockLocation({ locations: ["Munich"] }),
        createMockLocation({ locations: ["Lisbon"] })
      ];

      expect(store.UNIQUE_LOCATIONS).toEqual([["Munich"], ["Lisbon"]]);
    });
  });
});
