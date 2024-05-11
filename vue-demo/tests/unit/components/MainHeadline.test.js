import { render, screen } from "@testing-library/vue";
import { nextTick } from "vue";

import MainHeadline from "@/components/MainHeadline.vue";

describe("MainHeadline test", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("displays introductory keyword", () => {
    render(MainHeadline);
    const keywordPhrase = screen.getByRole("heading", {
      name: /build your bricks/i
    });
    expect(keywordPhrase).toBeInTheDocument();
  });

  it("changes keyword at consistent interval", () => {
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);

    render(MainHeadline);
    expect(mock).toHaveBeenCalled();
  });

  it("swaps keywords after interval", async () => {
    render(MainHeadline);
    vi.advanceTimersToNextTimer();

    await nextTick();
    const keyword = screen.getByRole("heading", {
      name: /find your bricks/i
    });
    expect(keyword).toBeInTheDocument();
  });

  it("removes interval when component disappears", () => {
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);

    const { unmount } = render(MainHeadline);
    unmount();
    expect(clearInterval).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
