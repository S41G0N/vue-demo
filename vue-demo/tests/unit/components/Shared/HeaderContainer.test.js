import { render, screen } from "@testing-library/vue";
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";
import { expect } from "vitest";

describe("Header container", () => {
  it("tests passing the title and subtitle content", () => {
    render(HeaderContainer, {
      slots: { title: "<h1> Test title </h1>", subtitle: "<h2> Test subtitle </h2>" }
    });
    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
  });
});
