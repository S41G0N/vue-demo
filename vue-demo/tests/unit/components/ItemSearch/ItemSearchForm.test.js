import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import ItemSearchForm from "@/components/ItemSearch/ItemSearchForm.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";

vi.mock("vue-router");

describe("ItemSearchForm", () => {
  describe("when user submits form", () => {
    it("directs user to listings page with query parameters", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });

      render(ItemSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        }
      });

      const itemSearchInput = screen.getByRole("textbox", { name: /what/i });
      await userEvent.type(itemSearchInput, "Medieval Blacksmith");

      const locationInput = screen.getByRole("textbox", { name: /where?/i });
      await userEvent.type(locationInput, "Amsterdam");

      const submitButton = screen.getByRole("button", { name: /search/i });
      await userEvent.click(submitButton);
      expect(push).toHaveBeenCalledWith({
        name: "Listings",
        query: { item: "Medieval Blacksmith", location: "Amsterdam" }
      });
    });
  });
});
