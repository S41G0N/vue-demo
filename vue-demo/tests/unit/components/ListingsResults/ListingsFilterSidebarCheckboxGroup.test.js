import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { describe, expect } from "vitest";
import { useRouter } from "vue-router";

import ListingsFilterSidebarCheckboxGroup from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarCheckboxGroup.vue";

vi.mock("vue-router");

describe("ListingsFilterSidebarCheckboxGroup", () => {
  const mockProps = (props = {}) => ({
    header: "Test header",
    availableFilters: new Set("A", "B"),
    action: vi.fn(),
    ...props
  });

  const renderListingsFilterSidebarCheckboxGroup = (customProps = {}) => {
    const pinia = createTestingPinia();

    render(ListingsFilterSidebarCheckboxGroup, {
      props: {
        ...customProps
      },
      global: {
        plugins: [pinia],
        stubs: { FontAwesomeIcon: true }
      }
    });
  };

  it("renders a unique list of filters", async () => {
    const props = mockProps({
      header: "Test",
      availableFilters: new Set(["1", "2"])
    });

    renderListingsFilterSidebarCheckboxGroup(props);

    const button = screen.getByRole("button", { name: /test/i });
    await userEvent.click(button);

    const listedFilters = screen.getAllByRole("listitem");
    const uniqueFilters = listedFilters.map((node) => node.textContent);
    expect(uniqueFilters).toEqual(["1", "2"]);
  });

  it("tests checkboxes", async () => {
    const action = vi.fn();
    const props = mockProps({
      header: "Test",
      availableFilters: new Set(["New", "Old"]),
      action
    });

    useRouter.mockReturnValue({ push: vi.fn() });
    renderListingsFilterSidebarCheckboxGroup(props);

    const button = screen.getByRole("button", { name: /test/i });
    await userEvent.click(button);

    const oneCheckbox = screen.getByRole("checkbox", { name: /new/i });
    await userEvent.click(oneCheckbox);

    expect(action).toHaveBeenCalledWith(["New"]);
  });

  it("navigates to listings page after refreshing filters", async () => {
    const push = vi.fn();
    const action = vi.fn();
    const props = mockProps({
      header: "Test",
      availableFilters: new Set(["New", "Old"]),
      action
    });

    useRouter.mockReturnValue({ push });
    renderListingsFilterSidebarCheckboxGroup(props);

    const button = screen.getByRole("button", { name: /test/i });
    await userEvent.click(button);

    const oneCheckbox = screen.getByRole("checkbox", { name: /new/i });
    await userEvent.click(oneCheckbox);

    expect(push).toHaveBeenCalledWith({ name: "Listings" });
  });
});
