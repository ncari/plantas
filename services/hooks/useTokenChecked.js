import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useTokenChecked() {
  const { tokenChecked } = useContext(AuthContext);
  return tokenChecked;
}
