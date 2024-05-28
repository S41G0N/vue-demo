import { render, screen } from "@testing-library/vue";
import ItemListings from "@/components/ListingsResults/ItemListings.vue";
import axios from "axios";
import { vi } from "vitest";
import { RouterLinkStub } from "@vue/test-utils";

/*Replaces real axios to simulate backend*/
vi.mock("axios");

describe("ItemListings", () => {
  const renderWithPrompts = () => {
    render(ItemListings, {
      global: {
        stubs: {
          "router-link": RouterLinkStub
        }
      }
    });
  };
  it("fetches listings", () => {
    axios.get.mockResolvedValue({ data: [] });
    renderWithPrompts();
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/sets");
  });

  /* Async to make sure this code runs after axios.get and DOM to get updated */
  it("create a listing for every set", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({ locations: ["Hello", "World"] }) });
    renderWithPrompts();

    const totalListings = await screen.findAllByRole("listitem");
    expect(totalListings).toHaveLength(15);
  });
});
