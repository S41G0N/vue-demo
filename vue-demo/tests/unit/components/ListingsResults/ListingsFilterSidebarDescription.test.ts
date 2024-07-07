import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user";
import ListingsFilterSidebarDescription from "@/components/ListingsResults/ListingsFilterSidebar/ListingsFilterSidebarDescription.vue";

describe("ListingsFilterSidebarDescription", () => {
  const renderListingsFilterSidebarDescription = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();
    render(ListingsFilterSidebarDescription, { global: { plugins: [pinia] } });
    return { userStore };
  };

  it("fills in search input from 'user' store", async () => {
    const { userStore } = renderListingsFilterSidebarDescription();
    userStore.descriptionSearchTerm = "Programmer";
    const input = await screen.findByRole<HTMLInputElement>("textbox");

    expect(input.value).toBe("Programmer");
  });

  it("fills 'user' store from search input", async () => {
    const { userStore } = renderListingsFilterSidebarDescription();
    userStore.descriptionSearchTerm = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "Test Search Term");
    await userEvent.click(document.body);

    expect(userStore.UPDATE_DESCRIPTION_SEARCH_TERM).toHaveBeenCalledWith("Test Search Term");
  });

  it("removes whitespace in user input", async () => {
    const { userStore } = renderListingsFilterSidebarDescription();
    userStore.descriptionSearchTerm = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "   Test Search Term    ");
    await userEvent.click(document.body);

    expect(userStore.UPDATE_DESCRIPTION_SEARCH_TERM).toHaveBeenCalledWith("Test Search Term");
  });
});
