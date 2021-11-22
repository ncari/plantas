import axios from "axios";

import { api } from "../config/config";

const axiosInstance = axios.create({
  baseURL: `${api}`,
  timeout: 5000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

export default axiosInstance;
