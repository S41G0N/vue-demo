import { render, screen } from "@testing-library/vue";
import axios from "axios";
import SpotLight from "@/components/ItemSearch/SpotLight.vue";

vi.mock("axios");

describe("SpotLight test", () => {
  const mockApiResponse = (cards = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "Test image",
          title: "Test title",
          description: "Test description",
          ...cards
        }
      ]
    });
  };

  it("provides image to parent", async () => {
    mockApiResponse();
    render(SpotLight, {
      slots: {
        default: `
        <template #default="cards">
            <h2> {{ cards.img }} </h2>
        </template>`
      }
    });

    const searchedText = await screen.findByText("Test image");
    expect(searchedText).toBeInTheDocument();
  });

  it("provides title to parent", async () => {
    mockApiResponse();
    render(SpotLight, {
      slots: {
        default: `
        <template #default="cards">
            <h2> {{ cards.title }} </h2>
        </template>`
      }
    });

    const searchedText = await screen.findByText("Test title");
    expect(searchedText).toBeInTheDocument();
  });

  it("provides description to parent", async () => {
    mockApiResponse();
    render(SpotLight, {
      slots: {
        default: `
        <template #default="cards">
            <h2> {{ cards.description }} </h2>
        </template>`
      }
    });

    const searchedText = await screen.findByText("Test description");
    expect(searchedText).toBeInTheDocument();
  });
});
