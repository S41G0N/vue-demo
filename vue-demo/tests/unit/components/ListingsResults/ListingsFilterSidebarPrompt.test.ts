import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/stores/user";
import ListignsFilterSidebarPrompt from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarPrompt.vue";

describe("ListignsFilterSidebarPrompt", () => {
  describe("when user click on 'Clear Filters' button", () => {
    it("invokes CLEAR_USER_SELECTED_FILTERS()", async () => {
      const pinia = createTestingPinia();
      const userStore = useUserStore();

      render(ListignsFilterSidebarPrompt, {
        global: { plugins: [pinia] }
      });

      const clearFiltersButton = screen.getByRole("button", { name: /clear filters/i });
      await userEvent.click(clearFiltersButton);

      expect(userStore.CLEAR_USER_SELECTED_FILTERS).toHaveBeenCalled();
    });
  });
});
