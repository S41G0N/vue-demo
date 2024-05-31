import axios from "axios";

vi.mock("axios");

import fetchListings from "@/api/fetchListings";

describe("Fetch listings", () => {
  it("fetches listings that meet criteria", async () => {
    await fetchListings();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/sets");
  });
});
