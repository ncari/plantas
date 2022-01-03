import React from "react";
import { createContext } from "react";
import axios from "axios";

import { api } from "../../config/config";
import useLogout from "../hooks/useLogout";
import useToken from "../hooks/useToken";

const AxiosContext = createContext(null);
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
  const token = useToken();
  const logout = useLogout();

  const _axios = axios.create({
    baseURL: `${api}`,
    timeout: 5000,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    validateStatus: function (status) {
      return status >= 200 && status < 300;
    },
  });

  _axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  _axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      if (error.response.status === 401) logout();
      return Promise.reject(error);
    }
  );

  return <Provider value={{ axios: _axios }}>{children}</Provider>;
};

export { AxiosContext, AxiosProvider };
