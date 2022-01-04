import { useContext } from "react";
import { ErrorContext } from "../context/ErrorContext";

export default function useErrorMsg() {
  const { error, clear } = useContext(ErrorContext);
  return { error_msg: error, clear };
}
