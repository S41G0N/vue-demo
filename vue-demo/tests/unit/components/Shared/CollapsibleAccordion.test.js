import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { describe } from "vitest";

describe("CollapsibleAccordion test", () => {
  it("renders child and its contents", async () => {
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
      }
    });
    expect(screen.queryByText("My testing child")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /my category/i });
    await userEvent.click(button);
    expect(screen.getByText("My testing child")).toBeInTheDocument();
  });
});
