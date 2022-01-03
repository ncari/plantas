import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeTab from "./HomeTab";
import SignIn from "../containers/SignIn";
import Register from "../containers/Register";
import useToken from "../services/hooks/useToken";
import useTokenChecked from "../services/hooks/useTokenChecked";

const Stack = createStackNavigator();

export default function Navigation() {
  const token = useToken();
  const tokenChecked = useTokenChecked();

  if (!tokenChecked) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token !== "" ? (
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
  );
}
