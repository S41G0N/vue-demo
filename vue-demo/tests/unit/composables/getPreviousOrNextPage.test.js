import getPreviousOrNextPage from "@/composables/getPreviousOrNextPage";
import { describe, expect } from "vitest";

describe("getPreviousOrNextPage", () => {
  it("calculates previous page", () => {
    const currentPage = { value: 8 };
    const maxPage = { value: 10 };
    const { previousPage } = getPreviousOrNextPage(currentPage, maxPage);
    expect(previousPage.value).toBe(currentPage.value - 1);
  });

  describe("When on first page", () => {
    it("previousPage should still be one", () => {
      const currentPage = { value: 1 };
      const maxPage = { value: 1 };
      const { previousPage } = getPreviousOrNextPage(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });

  it("calculates next page", () => {
    const currentPage = { value: 1 };
    const maxPage = { value: 3 };
    const { nextPage } = getPreviousOrNextPage(currentPage, maxPage);
    expect(nextPage.value).toBe(currentPage.value + 1);
  });

  describe("When current page is the last page", () => {
    it("previousPage should still be one", () => {
      const currentPage = { value: 1 };
      const maxPage = { value: 1 };
      const { nextPage } = getPreviousOrNextPage(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
