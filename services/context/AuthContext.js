import React from "react";
import { useState, useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [token, setTokenDefault] = useState({ value: "", checked: false });

  useEffect(async () => {
    let token = await SecureStore.getItemAsync("token");
    setTokenDefault({ value: token, checked: true });
  }, []);

  const setToken = async (t) => {
    await SecureStore.setItemAsync("token", t);
    setTokenDefault({ value: t, checked: true });
  };

  const logout = () => {
    setToken("");
  };

  return (
    <Provider
      value={{
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
