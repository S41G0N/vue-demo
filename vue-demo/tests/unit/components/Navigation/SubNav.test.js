import { render, screen } from "@testing-library/vue";

import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav test", () => {
  describe("When user on jobs page", () => {
    it("displays jobs count", () => {
      const $route = { name: "Listings" };
      render(SubNav, {
        global: {
          mocks: { $route: $route },
          stubs: {
            FontAwesomeIcon: true
          }
        }
      });
      const jobsCount = screen.getByText("1653");
      expect(jobsCount).toBeInTheDocument();
    });
  });
  describe("When user NOT on jobs page", () => {
    it(" does NOT display jobs count", () => {
      const $route = { name: "Home" };
      render(SubNav, {
        global: {
          mocks: {
            $route: $route
          }
        }
      });
      const jobsCount = screen.queryByText("1653");
      expect(jobsCount).not.toBeInTheDocument();
    });
  });
});
