import { render, screen } from "@testing-library/vue";
import SubNav from "@/components/Navigation/SubNav.vue";
import { createTestingPinia } from "@pinia/testing";
import { useListingsStore } from "@/stores/listings";

import { useRoute } from "vue-router";

vi.mock("vue-router");

describe("SubNav test", () => {
  const pinia = createTestingPinia();
  const listingsStore = useListingsStore();

  const renderSubnav = () => {
    render(SubNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
    return { listingsStore };
  };

  describe("When user on sets listings page", () => {
    it("displays listings count", async () => {
      useRoute.mockReturnValue({ name: "Listings" });
      const { listingsStore } = renderSubnav();

      const numberOfListings = 16;
      listingsStore.FILTERED_LISTINGS = Array(numberOfListings).fill({});

      const listingsCount = await screen.findByText(numberOfListings);
      expect(listingsCount).toBeInTheDocument();
    });
  });

  describe("When user NOT on listings page", () => {
    it("does NOT display listings count", () => {
      useRoute.mockReturnValue({ name: "Home" });
      const { listingsStore } = renderSubnav();
      const numberOfListings = 16;

      listingsStore.FILTERED_LISTINGS = Array(numberOfListings).fill({});
      const listingsCount = screen.queryByText(numberOfListings);
      expect(listingsCount).not.toBeInTheDocument();
    });
  });
});
