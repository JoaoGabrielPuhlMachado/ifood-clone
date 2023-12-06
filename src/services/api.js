import axios from "axios";

const api = axios.create({
  baseURL: "https://ligiaroupas.3.us-1.fl0.io/api/",
});

export default api;
