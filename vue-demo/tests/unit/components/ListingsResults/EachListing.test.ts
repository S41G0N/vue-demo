import { render, screen } from "@testing-library/vue";
import EachListing from "@/components/ListingsResults/EachListing.vue";
import { RouterLinkStub } from "@vue/test-utils";
import type { Listing } from "@/api/types";
import { createMockListing } from "../../utils/createMockListing";

describe("EachListing", () => {
  const renderWithStubs = (customProps: Listing) => {
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
    const customProps = createMockListing({ title: "My Title" });
    renderWithStubs(customProps);
    expect(screen.getByText("My Title")).toBeInTheDocument;
  });

  it("renders location", () => {
    const customProps = createMockListing({ locations: ["My Location 1", "My Location 2"] });
    renderWithStubs(customProps);
    expect(screen.getByText("My Location 1")).toBeInTheDocument;
  });

  it("renders details (description)", () => {
    const customProps = createMockListing({
      description: ["My Description 1", "My Description 2", "My Description 3"]
    });
    renderWithStubs(customProps);
    expect(screen.getByText("My Description 1")).toBeInTheDocument;
  });
});
