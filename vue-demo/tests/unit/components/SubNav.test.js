import { render, screen } from "@testing-library/vue";

import SubNav from "@/components/SubNav.vue";

describe("SubNav test", () => {
  describe("When user on jobs page", () => {
    it("displays jobs count", () => {
      render(SubNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        },
        data() {
          return {
            onJobsResultsPage: true
          };
        }
      });
      const jobsCount = screen.getByText("1653");
      expect(jobsCount).toBeInTheDocument();
    });
  });
  describe("When user NOT on jobs page", () => {
    it(" does NOT display jobs count", () => {
      render(SubNav, {
        data() {
          return {
            onJobsResultsPage: false
          };
        }
      });
      const jobsCount = screen.queryByText("1653");
      expect(jobsCount).not.toBeInTheDocument();
    });
  });
});
