import axios from "axios";
import type { Listing } from "@/api/types";

const fetchListings = async () => {
  const baseURL = import.meta.env.VITE_APP_API_URL;
  const response = await axios.get<Listing[]>(`${baseURL}/sets`);
  return response.data;
};

export default fetchListings;
