import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api", // Change to your backend base URL if needed
});

axios.defaults.withCredentials = true;

const FetchApi = async (url, method = "GET", info) => {
  const config = {
    url,
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    baseURL: `http://localhost:4000/api/v1`,
  };
  if (method !== "GET" && method !== "DELETE") {
    config.data = info;
  }

  const { data } = await instance(config);
  return data;
};
export default FetchApi;
