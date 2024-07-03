import type { Listing } from "@/api/types";

export const createMockListing = (listing: Partial<Listing> = {}): Listing => ({
  id: 1,
  title: "Test Title",
  seller: "Test Seller",
  condition: "Used",
  minifigCount: "4",
  locations: ["Location"],
  minifiguresIncluded: ["Test Minifigure"],
  randomText: ["Test Random Text"],
  description: ["Test Description"],
  dateAdded: "2020-03-20",
  ...listing
});
