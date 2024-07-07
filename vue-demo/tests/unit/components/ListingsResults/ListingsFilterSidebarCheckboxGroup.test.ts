import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { describe, expect } from "vitest";
import { useRouter } from "vue-router";
import type { Mock } from "vitest";

import ListingsFilterSidebarCheckboxGroup from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarCheckboxGroup.vue";
import { useUserStore } from "@/stores/user";

vi.mock("vue-router");

const useMockRouter = useRouter as Mock;

describe("ListingsFilterSidebarCheckboxGroup", () => {
  interface ListingsFilterSidebarCheckboxGroupProps {
    availableFilters: Set<string>;
    action: Mock;
  }
  const mockProps = (
    props: Partial<ListingsFilterSidebarCheckboxGroupProps> = {}
  ): ListingsFilterSidebarCheckboxGroupProps => ({
    availableFilters: new Set("A"),
    action: vi.fn(),
    ...props
  });

  const renderListingsFilterSidebarCheckboxGroup = (
    customProps: ListingsFilterSidebarCheckboxGroupProps
  ) => {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    render(ListingsFilterSidebarCheckboxGroup, {
      props: { ...customProps },
      global: { plugins: [pinia] }
    });

    return { userStore };
  };

  it("renders a unique list of filters", () => {
    const props = mockProps({
      availableFilters: new Set(["1", "2"])
    });

    renderListingsFilterSidebarCheckboxGroup(props);

    const listedFilters = screen.getAllByRole("listitem");
    const uniqueFilters = listedFilters.map((node) => node.textContent);
    expect(uniqueFilters).toEqual(["1", "2"]);
  });

  describe("When user clicks checkboxes", () => {
    it("tests checkboxes", async () => {
      const action = vi.fn();
      const props = mockProps({
        availableFilters: new Set(["New", "Old"]),
        action
      });

      useMockRouter.mockReturnValue({ push: vi.fn() });
      renderListingsFilterSidebarCheckboxGroup(props);

      const oneCheckbox = screen.getByRole("checkbox", { name: /new/i });
      await userEvent.click(oneCheckbox);

      expect(action).toHaveBeenCalledWith(["New"]);
    });

    it("navigates to listings page after refreshing filters", async () => {
      const push = vi.fn();
      const action = vi.fn();
      const props = mockProps({
        availableFilters: new Set(["New", "Old"]),
        action
      });

      useMockRouter.mockReturnValue({ push });
      renderListingsFilterSidebarCheckboxGroup(props);

      const oneCheckbox = screen.getByRole("checkbox", { name: /new/i });
      await userEvent.click(oneCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "Listings" });
    });
  });

  describe("When user clears job filters", () => {
    it("All previously selected checkboxes should become unselected", async () => {
      useMockRouter.mockReturnValue({ push: vi.fn() });
      //Render checkbox with mock props
      const props = mockProps({
        availableFilters: new Set(["New", "Old"])
      });
      const { userStore } = renderListingsFilterSidebarCheckboxGroup(props);

      //Click Checkbox
      const checkboxBeforeAction = screen.getByRole<HTMLInputElement>("checkbox", { name: /new/i });
      await userEvent.click(checkboxBeforeAction);

      //Expect checkboxes to be checked
      expect(checkboxBeforeAction.checked).toBe(true);

      //Clear Filters
      userStore.CLEAR_USER_SELECTED_FILTERS();
      //Check that checkboxes have been cleared -> await to give time for checkboxes to update
      const checkboxAfterAction = await screen.findByRole<HTMLInputElement>("checkbox", {
        name: /new/i
      });
      expect(checkboxAfterAction.checked).toBe(false);
    });
  });
});
