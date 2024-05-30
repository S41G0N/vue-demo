import { render, screen } from "@testing-library/vue";
import ItemListings from "@/components/ListingsResults/ItemListings.vue";
import axios from "axios";
import { vi } from "vitest";
import { RouterLinkStub } from "@vue/test-utils";

/*Replaces real axios to simulate backend*/
vi.mock("axios");

describe("ItemListings", () => {
  const makeRoute = (customParams = {}) => ({
    query: {
      page: "1",
      ...customParams
    }
  });

  const renderWithPrompts = (customRoute = {}) => {
    render(ItemListings, {
      global: {
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
    axios.get.mockResolvedValue({ data: [] });
    renderWithPrompts(makeRoute());
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/sets");
  });

  /* Async to make sure this code runs after axios.get and DOM to get updated */
  it("create a listing for every set", async () => {
    const listingsOnPage = 10;

    axios.get.mockResolvedValue({
      data: Array(listingsOnPage).fill({ locations: ["Hello", "World"] })
    });

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
    it("Previous button should be invisible", async () => {
      const listingsOnPage = 10;
      axios.get.mockResolvedValue({
        data: Array(listingsOnPage).fill({ locations: ["Hello", "World"] })
      });
      renderWithPrompts(makeRoute());
      await screen.findAllByRole("listitem");

      expect(screen.queryByRole("link", { name: /previous/i })).not.toBeInTheDocument();
    });

    it("Next button should be visible", async () => {
      const listingsOnPage = 20;
      axios.get.mockResolvedValue({
        data: Array(listingsOnPage).fill({ locations: ["Hello", "World"] })
      });

      renderWithPrompts(makeRoute({ page: "1" }));
      await screen.findAllByRole("listitem");

      expect(screen.queryByRole("link", { name: /next/i })).toBeInTheDocument();
    });
  });
});
