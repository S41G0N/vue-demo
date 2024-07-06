import type { Location } from "@/api/types";

export const createMockLocation = (degree_props: Partial<Location> = {}): Location => ({
  id: 1,
  locations: ["Test Location", "Test Location 2"],
  ...degree_props
});
