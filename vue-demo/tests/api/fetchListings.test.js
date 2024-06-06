import axios from "axios";
import fetchListings from "@/api/fetchListings";
import { beforeEach } from "vitest";

vi.mock("axios");

describe("Fetch listings", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Test title"
        }
      ]
    });
  });
  it("fetches listings that meet criteria", async () => {
    await fetchListings();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/sets");
  });
  it("extracts listings from response", async () => {
    const data = await fetchListings();
    expect(data).toEqual([{ id: 1, title: "Test title" }]);
  });
});
