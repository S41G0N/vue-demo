import axios from "axios";
import type { Location } from "@/api/types";

const fetchLocations = async () => {
  const baseURL = import.meta.env.VITE_APP_API_URL;
  const response = await axios.get<Location[]>(`${baseURL}/location`);
  return response.data;
};

export default fetchLocations;
