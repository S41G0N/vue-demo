import { render, screen } from "@testing-library/vue";
import ItemListings from "@/components/ListingsResults/ItemListings.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useListingsStore } from "@/stores/listings";
import { useRoute } from "vue-router";
vi.mock("vue-router");

describe("ItemListings", () => {
  const renderWithPrompts = () => {
    const pinia = createTestingPinia();
    const listingsStore = useListingsStore();
    listingsStore.FILTERED_LISTINGS = Array(15).fill({ locations: ["Hello", "World"] });

    render(ItemListings, {
      global: {
        plugins: [pinia],
        stubs: {
          "router-link": RouterLinkStub
        }
      }
    });
    return { listingsStore };
  };

  it("fetches listings", () => {
    useRoute.mockReturnValue({ query: {} });
    const { listingsStore } = renderWithPrompts();
    expect(listingsStore.FETCH_LISTINGS).toHaveBeenCalledWith();
  });

  it("create only 10 listings on the first page", async () => {
    const { listingsStore } = renderWithPrompts();
    listingsStore.FILTERED_LISTINGS = Array(15).fill({ locations: ["Hello", "World"] });

    useRoute.mockReturnValue({ query: { page: "1" } });
    const totalListings = await screen.findAllByRole("listitem");
    expect(totalListings).toHaveLength(10);
  });

  describe("When 'page' NOT in query params", () => {
    it("displays page 1", () => {
      useRoute.mockReturnValue({ query: {} });
      renderWithPrompts();
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("When 'page' in query params", () => {
    it("displays current page number", () => {
      useRoute.mockReturnValue({ query: { page: "2" } });
      renderWithPrompts();
      expect(screen.getByText("Page 2")).toBeInTheDocument();
    });
  });

  describe("When user on page 1", () => {
    it("Previous button should be invisible, next button should be visible", async () => {
      useRoute.mockReturnValue({ query: { page: "1" } });
      const listingsOnPage = 20;
      const { listingsStore } = renderWithPrompts();

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
      useRoute.mockReturnValue({ query: { page: "4" } });
      const listingsOnPage = 40;
      const { listingsStore } = renderWithPrompts();
      listingsStore.FILTERED_LISTINGS = Array(listingsOnPage).fill({
        locations: ["Hello", "World"]
      });
      await screen.findAllByRole("listitem");

      expect(screen.queryByRole("link", { name: /previous/i })).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: /next/i })).not.toBeInTheDocument();
    });
  });
});
