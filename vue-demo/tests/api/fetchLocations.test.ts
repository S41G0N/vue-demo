import type { Mock } from "node:test";
import axios from "axios";
import fetchLocations from "@/api/fetchLocations";
import { beforeEach } from "vitest";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("fetchLocations", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          locations: ["Munich"]
        }
      ]
    });
  });
  it("fetches locations that meet criteria", async () => {
    await fetchLocations();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/location");
  });
  it("extracts locations from response", async () => {
    const locations = await fetchLocations();
    expect(locations).toEqual([{ id: 1, locations: ["Munich"] }]);
  });
});
