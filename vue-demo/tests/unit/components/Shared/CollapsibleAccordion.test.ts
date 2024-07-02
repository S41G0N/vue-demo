import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { describe } from "vitest";

describe("CollapsibleAccordion test", () => {
  const renderCollapsibleAccordion = (custom_params = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      props: {
        header: "My Category"
      },
      slots: {
        default: "<h3>My testing child</h3>"
      },
      ...custom_params
    });
  };

  renderCollapsibleAccordion();
  it("renders child and its contents", async () => {
    expect(screen.queryByText("My testing child")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /my category/i });
    await userEvent.click(button);
    expect(screen.getByText("My testing child")).toBeInTheDocument();
  });

  describe("If custom content is NOT passed to slot", () => {
    it("shows default content", async () => {
      renderCollapsibleAccordion({ slots: { default: "" } });
      const button = screen.getByRole("button", { name: /my category/i });
      await userEvent.click(button);
      expect(screen.getByText("Backup Content")).toBeInTheDocument();
    });
  });
});
