import { render, screen } from "@testing-library/vue";
import ItemListings from "@/components/ListingsResults/ItemListings.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useListingsStore } from "@/stores/listings";
import { useLocationsStore } from "@/stores/locations";
import { useRoute } from "vue-router";
import type { Mock } from "vitest";

vi.mock("vue-router");

const useMockRoute = useRoute as Mock;

describe("ItemListings", () => {
  const renderWithPrompts = () => {
    const pinia = createTestingPinia();
    const listingsStore = useListingsStore();
    const locationsStore = useLocationsStore();
    // @ts-expect-error: read-only
    listingsStore.FILTERED_LISTINGS = Array(15).fill({ locations: ["Hello", "World"] });

    render(ItemListings, {
      global: {
        plugins: [pinia],
        stubs: {
          "router-link": RouterLinkStub
        }
      }
    });
    return { listingsStore, locationsStore };
  };

  it("fetches listings", () => {
    useMockRoute.mockReturnValue({ query: {} });
    const { listingsStore } = renderWithPrompts();
    expect(listingsStore.FETCH_LISTINGS).toHaveBeenCalledWith();
  });

  it("fetches degrees", () => {
    useMockRoute.mockReturnValue({ query: {} });
    const { locationsStore } = renderWithPrompts();
    expect(locationsStore.FETCH_LOCATIONS).toHaveBeenCalled();
  });

  it("create only 10 listings on the first page", async () => {
    const { listingsStore } = renderWithPrompts();
    // @ts-expect-error: read-only
    listingsStore.FILTERED_LISTINGS = Array(15).fill({ locations: ["Hello", "World"] });

    useMockRoute.mockReturnValue({ query: { page: "1" } });
    const totalListings = await screen.findAllByRole("listitem");
    expect(totalListings).toHaveLength(10);
  });

  describe("When 'page' NOT in query params", () => {
    it("displays page 1", () => {
      useMockRoute.mockReturnValue({ query: {} });
      renderWithPrompts();
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("When 'page' in query params", () => {
    it("displays current page number", () => {
      useMockRoute.mockReturnValue({ query: { page: "2" } });
      renderWithPrompts();
      expect(screen.getByText("Page 2")).toBeInTheDocument();
    });
  });

  describe("When user on page 1", () => {
    it("Previous button should be invisible, next button should be visible", async () => {
      useMockRoute.mockReturnValue({ query: { page: "1" } });
      const listingsOnPage = 20;
      const { listingsStore } = renderWithPrompts();
      // @ts-expect-error: read-only
      listingsStore.FILTERED_LISTINGS = Array(listingsOnPage).fill({
        locations: ["Hello", "World"]
      });
      await screen.findAllByRole("listitem");

      expect(screen.queryByRole("link", { name: /previous/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("link", { name: /next/i })).toBeInTheDocument();
    });
  });

  describe("When user on last page", () => {
    it("Previous button should be visible, next button should be invisible", async () => {
      useMockRoute.mockReturnValue({ query: { page: "4" } });
      const listingsOnPage = 40;
      const { listingsStore } = renderWithPrompts();
      // @ts-expect-error: read-only
      listingsStore.FILTERED_LISTINGS = Array(listingsOnPage).fill({
        locations: ["Hello", "World"]
      });
      await screen.findAllByRole("listitem");

      expect(screen.queryByRole("link", { name: /previous/i })).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: /next/i })).not.toBeInTheDocument();
    });
  });
});
