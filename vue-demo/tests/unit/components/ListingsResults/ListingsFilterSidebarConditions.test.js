import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { describe, expect } from "vitest";
import { useListingsStore } from "@/stores/listings";
import { useUserStore } from "@/stores/user";

import ListingsFilterSidebarConditions from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarConditions.vue";

describe("ListingsFilterSidebarConditions", () => {
  const renderListingsFilterSidebarConditions = () => {
    const pinia = createTestingPinia();
    const listingsStore = useListingsStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };

    render(ListingsFilterSidebarConditions, {
      global: {
        mocks: { $router },
        plugins: [pinia],
        stubs: { FontAwesomeIcon: true }
      }
    });
    return { listingsStore, userStore, $router };
  };

  it("renders a unique list of conditions in the filter", async () => {
    const { listingsStore } = renderListingsFilterSidebarConditions();
    listingsStore.UNIQUE_CONDITION = new Set(["New", "MISB"]);

    const button = screen.getByRole("button", { name: /condition/i });
    await userEvent.click(button);

    const conditionFilters = screen.getAllByRole("listitem");
    const uniqueConditions = conditionFilters.map((node) => node.textContent);
    expect(uniqueConditions).toEqual(["New", "MISB"]);
  });

  it("tests checkboxes", async () => {
    const { listingsStore, userStore } = renderListingsFilterSidebarConditions();
    listingsStore.UNIQUE_CONDITION = new Set(["New", "MISB"]);

    const button = screen.getByRole("button", { name: /condition/i });
    await userEvent.click(button);

    const oneConditionCheckbox = screen.getByRole("checkbox", { name: /new/i });
    await userEvent.click(oneConditionCheckbox);

    expect(userStore.ADD_SELECTED_CONDITION).toHaveBeenCalledWith(["New"]);
  });

  it("navigates to listings page after refreshing filters", async () => {
    const { listingsStore, $router } = renderListingsFilterSidebarConditions();
    listingsStore.UNIQUE_CONDITION = new Set(["MISB"]);

    const button = screen.getByRole("button", { name: /condition/i });
    await userEvent.click(button);

    const oneConditionCheckbox = screen.getByRole("checkbox", { name: /misb/i });
    await userEvent.click(oneConditionCheckbox);

    expect($router.push).toHaveBeenCalledWith({ name: "Listings" });
  });
});
