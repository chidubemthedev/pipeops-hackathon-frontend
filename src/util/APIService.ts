import axios from "axios";
import { baseUrl } from "./endpoints";

export const APIService = axios.create({
  baseURL: baseUrl,
});
