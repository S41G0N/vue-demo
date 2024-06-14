import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { describe } from "vitest";
import { useListingsStore } from "@/stores/listings";

import ListingsFilterSidebarMinifigures from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarMinifigures.vue";

describe("ListingsFilterSidebar", () => {
  it("renders a unique list of minifigs in the filter", async () => {
    const pinia = createTestingPinia();
    const store = useListingsStore();
    store.MINIFIG_COUNT = new Set(["1", "2"]);
    render(ListingsFilterSidebarMinifigures, {
      global: {
        plugins: [pinia],
        stubs: { FontAwesomeIcon: true }
      }
    });
    const button = screen.getByRole("button", { name: /minifigures/i });
    await userEvent.click(button);

    const minifigFilters = screen.getAllByRole("listitem");
    const minifigCount = minifigFilters.map((node) => node.textContent);
    expect(minifigCount).toEqual(["1", "2"]);
  });
});
