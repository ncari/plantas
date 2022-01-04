import React from "react";
import { useState, createContext } from "react";

const ErrorContext = createContext(null);
const { Provider } = ErrorContext;

const ErrorProvider = ({ children }) => {
  const [error, setErrorDefault] = useState("");

  const setError = (msg = "Hubo un problema. Intentelo mas tarde") =>
    setErrorDefault(msg);
  const clear = () => setError("");

  return <Provider value={{ error, setError, clear }}>{children}</Provider>;
};

export { ErrorContext, ErrorProvider };
