import React from "react";
import { useState, useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [tokenChecked, setTokenChecked] = useState(false);
  const [token, setTokenDefalut] = useState("");

  useEffect(async () => {
    let token = await SecureStore.getItemAsync("token");
    if (token) setToken(token);
    setTokenChecked(true);
  }, []);

  const setToken = async (t) => {
    await SecureStore.setItemAsync("token", token);
    setTokenDefalut(t);
  };

  const logout = () => {
    setToken("");
  };

  return (
    <Provider
      value={{
        token,
        tokenChecked,
        setToken,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
