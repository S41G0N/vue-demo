import { render, screen } from "@testing-library/vue";
import EachListing from "@/components/ListingsResults/EachListing.vue";

describe("EachListing", () => {
  it("renders listing title", () => {
    render(EachListing, {
      props: {
        listingObject: {
          title: "Test Title",
          locations: ["Test", "Test"]
        }
      }
    });
    expect(screen.getByText("Test Title")).toBeInTheDocument;
  });
});
