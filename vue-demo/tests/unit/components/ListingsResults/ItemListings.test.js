import { render, screen } from "@testing-library/vue";
import ItemListings from "@/components/ListingsResults/ItemListings.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useListingsStore } from "@/stores/listings";

/*Replaces real axios to simulate backend*/

describe("ItemListings", () => {
  const makeRoute = (customParams = {}) => ({
    query: {
      page: "1",
      ...customParams
    }
  });

  const pinia = createTestingPinia();

  const renderWithPrompts = (customRoute = {}) => {
    render(ItemListings, {
      global: {
        plugins: [pinia],
        stubs: {
          "router-link": RouterLinkStub
        },
        mocks: {
          $route: customRoute
        }
      }
    });
  };

  it("fetches listings", () => {
    renderWithPrompts(makeRoute());
    const listingsStore = useListingsStore();
    expect(listingsStore.FETCH_LISTINGS).toHaveBeenCalledWith();
  });

  /* Async to make sure this code runs after axios.get and DOM to get updated */
  it("create a listing for every set", async () => {
    const listingsOnPage = 10;
    const listingsStore = useListingsStore();
    listingsStore.listings = Array(listingsOnPage).fill({ locations: ["Hello", "World"] });

    renderWithPrompts(makeRoute({ page: "1" }));
    const totalListings = await screen.findAllByRole("listitem");
    expect(totalListings).toHaveLength(listingsOnPage);
  });

  describe("When 'page' NOT in query params", () => {
    it("displays page 1", () => {
      renderWithPrompts(makeRoute({ page: undefined }));
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("When 'page' in query params", () => {
    it("displays current page number", () => {
      renderWithPrompts(makeRoute({ page: "2" }));
      expect(screen.getByText("Page 2")).toBeInTheDocument();
    });
  });

  describe("When user on page 1", () => {
    it("Previous button should be invisible, next button should be visible", async () => {
      const listingsOnPage = 20;
      const listingsStore = useListingsStore();

      listingsStore.listings = Array(listingsOnPage).fill({ locations: ["Hello", "World"] });
      renderWithPrompts(makeRoute());
      await screen.findAllByRole("listitem");

      expect(screen.queryByRole("link", { name: /previous/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("link", { name: /next/i })).toBeInTheDocument();
    });
  });

  describe("When user on last page", () => {
    it("Previous button should be visible, next button should be invisible", async () => {
      const listingsOnPage = 40;
      const listingsStore = useListingsStore();
      listingsStore.listings = Array(listingsOnPage).fill({ locations: ["Hello", "World"] });
      renderWithPrompts(makeRoute({ page: "4" }));
      await screen.findAllByRole("listitem");

      expect(screen.queryByRole("link", { name: /previous/i })).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: /next/i })).not.toBeInTheDocument();
    });
  });
});
