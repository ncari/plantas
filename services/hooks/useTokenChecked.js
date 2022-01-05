import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useTokenChecked() {
  const { token } = useContext(AuthContext);
  return token.checked;
}
