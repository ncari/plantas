import { useContext } from "react";
import { ErrorContext } from "../context/ErrorContext";

export default function useError() {
  const { setError } = useContext(ErrorContext);
  return setError;
}
