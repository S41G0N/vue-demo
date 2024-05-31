import axios from "axios";

const fetchListings = async () => {
  const baseURL = import.meta.env.VITE_APP_API_URL;
  const response = await axios.get(`${baseURL}/sets`);
};

export default fetchListings;
