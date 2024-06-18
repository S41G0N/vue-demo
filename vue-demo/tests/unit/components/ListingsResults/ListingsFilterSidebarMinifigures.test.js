import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { describe } from "vitest";
import { useListingsStore } from "@/stores/listings";
import { useUserStore } from "@/stores/user";

import ListingsFilterSidebarMinifigures from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarMinifigures.vue";

describe("ListingsFilterSidebarMinifigures", () => {
  const renderListingsFilterSidebarMinifigures = () => {
    const pinia = createTestingPinia();
    const listingsStore = useListingsStore();
    const userStore = useUserStore();

    render(ListingsFilterSidebarMinifigures, {
      global: {
        plugins: [pinia],
        stubs: { FontAwesomeIcon: true }
      }
    });
    return { listingsStore, userStore };
  };

  it("renders a unique list of minifigs in the filter", async () => {
    const { listingsStore } = renderListingsFilterSidebarMinifigures();
    listingsStore.MINIFIG_COUNT = new Set(["1", "2"]);

    const button = screen.getByRole("button", { name: /minifigures/i });
    await userEvent.click(button);

    const minifigFilters = screen.getAllByRole("listitem");
    const minifigCount = minifigFilters.map((node) => node.textContent);
    expect(minifigCount).toEqual(["1", "2"]);
  });

  it("tests checkboxes", async () => {
    const { listingsStore, userStore } = renderListingsFilterSidebarMinifigures();
    listingsStore.MINIFIG_COUNT = new Set(["1", "2"]);

    const button = screen.getByRole("button", { name: /minifigures/i });
    await userEvent.click(button);

    const oneMinifigureCheckbox = screen.getByRole("checkbox", { name: /1/i });
    await userEvent.click(oneMinifigureCheckbox);

    expect(userStore.ADD_SELECTED_MINIFIGURES).toHaveBeenCalledWith(["1"]);
  });
});
