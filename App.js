import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "./containers/SignIn";
import Register from "./containers/Register";
import TokenContext from "./services/context";
import ErrorContainer from "./components/ErrorContainer";
import HomeTab from "./routes/HomeTab";

const Stack = createStackNavigator();

export default function App() {
  const [tokenChecked, setTokenChecked] = useState(false);
  const [contextValue, setContextValue] = useState({
    token: "",
    error: "",

    setToken: async (token) => {
      await SecureStore.setItemAsync("token", token);
      setContextValue((c) => ({ ...c, token }));
    },
    clearToken: async () => {
      await SecureStore.setItemAsync("token", "");
      setContextValue((c) => ({ ...c, token: "" }));
    },

    clearError: () => {
      setContextValue((c) => ({ ...c, error: "" }));
    },
    setError: (msg) =>
      setContextValue((c) => ({
        ...c,
        error: msg || "Hubo un error. Intentelo mas tarde.",
      })),
  });

  useEffect(async () => {
    let token = await SecureStore.getItemAsync("token");
    if (token) setContextValue({ ...contextValue, token });
    setTokenChecked(true);
  }, []);

  // show welcoming
  if (!tokenChecked) return null;

  return (
    <TokenContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator>
          {contextValue.token !== "" ? (
            <Stack.Screen
              name="HomeTab"
              component={HomeTab}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Sign in"
                component={SignIn}
                options={{ headerTitle: "Iniciar sesion" }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerTitle: "Registro" }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <ErrorContainer />
    </TokenContext.Provider>
  );
}
