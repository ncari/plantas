import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useToken() {
  const { token } = useContext(AuthContext);
  return token;
}
