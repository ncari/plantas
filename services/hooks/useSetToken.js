import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useSetToken() {
  const { setToken } = useContext(AuthContext);
  return setToken;
}
