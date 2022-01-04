import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useToken() {
  const { logout } = useContext(AuthContext);
  return logout;
}
