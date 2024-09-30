import Axios from "axios";
import { API_URL } from "../utilis/constant";

export const axios = Axios.create({
  baseURL: API_URL,
});
