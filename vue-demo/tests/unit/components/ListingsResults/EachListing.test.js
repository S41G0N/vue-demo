import { render, screen } from "@testing-library/vue";
import EachListing from "@/components/ListingsResults/EachListing.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("EachListing", () => {
  /* Return a prop object -> Add more properties if necessary */
  const createMockProps = (customProps = {}) => ({
    title: "Test title",
    locations: ["Location1", "Location2"],
    description: ["Description1", "Description2"],
    /*Ovevrite with custom propmpts*/
    ...customProps
  });

  const renderWithStubs = (customProps) => {
    render(EachListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub
        }
      },
      props: {
        listingObject: {
          ...customProps
        }
      }
    });
  };
  it("renders listing title", () => {
    const customProps = createMockProps({ title: "My Title" });
    renderWithStubs(customProps);
    expect(screen.getByText("My Title")).toBeInTheDocument;
  });

  it("renders location", () => {
    const customProps = createMockProps({ locations: ["My Location 1", "My Location 2"] });
    renderWithStubs(customProps);
    expect(screen.getByText("My Location 1")).toBeInTheDocument;
  });

  it("renders details (description)", () => {
    const customProps = createMockProps({
      description: ["My Description 1", "My Description 2", "My Description 3"]
    });
    renderWithStubs(customProps);
    expect(screen.getByText("My Description 1")).toBeInTheDocument;
  });
});
