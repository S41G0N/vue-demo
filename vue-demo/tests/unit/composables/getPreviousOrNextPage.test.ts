import getPreviousOrNextPage from "@/composables/getPreviousOrNextPage";
import { describe, expect } from "vitest";
import { ref } from "vue";

describe("getPreviousOrNextPage", () => {
  it("calculates previous page", () => {
    const currentPage = ref(8);
    const maxPage = ref(10);
    const { previousPage } = getPreviousOrNextPage(currentPage, maxPage);
    expect(previousPage.value).toBe(currentPage.value - 1);
  });

  describe("When on first page", () => {
    it("previousPage should still be one", () => {
      const currentPage = ref(1);
      const maxPage = ref(1);
      const { previousPage } = getPreviousOrNextPage(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });

  it("calculates next page", () => {
    const currentPage = ref(1);
    const maxPage = ref(3);
    const { nextPage } = getPreviousOrNextPage(currentPage, maxPage);
    expect(nextPage.value).toBe(currentPage.value + 1);
  });

  describe("When current page is the last page", () => {
    it("previousPage should still be one", () => {
      const currentPage = ref(1);
      const maxPage = ref(1);
      const { nextPage } = getPreviousOrNextPage(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
