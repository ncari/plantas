import { useContext } from "react";
import { AxiosContext } from "../context/AxiosContext";

export default function useAxios() {
  const { axios } = useContext(AxiosContext);
  return axios;
}
