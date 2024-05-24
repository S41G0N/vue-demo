import { render, screen } from "@testing-library/vue";
import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav test", () => {
  const renderSubnav = (routeName) => {
    render(SubNav, {
      global: {
        mocks: { $route: { name: routeName } },
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
  };
  describe("When user on sets listings page", () => {
    it("displays listings count", () => {
      renderSubnav("Listings");
      const listingsCount = screen.getByText("1653");
      expect(listingsCount).toBeInTheDocument();
    });
  });
  describe("When user NOT on jobs page", () => {
    it(" does NOT display jobs count", () => {
      renderSubnav("Home");
      const listingsCount = screen.queryByText("1653");
      expect(listingsCount).not.toBeInTheDocument();
    });
  });
});
