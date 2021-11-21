import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import { createStackNavigator } from "@react-navigation/stack";
import tw from "twrnc";
import { Book, Grid, Home, User } from "react-native-feather";

import HomeStack from "./routes/Home";
import ExploreStack from "./routes/Explore";
import ProfileStack from "./routes/Profile";
import MyPlantsStack from "./routes/MyPlants";

import SignIn from "./containers/SignIn";
import Register from "./containers/Register";
import TokenContext from "./services/context";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [tokenChecked, setTokenChecked] = useState(false);
  const [contextValue, setContextValue] = useState({
    token: "",
    setToken: async (token) => {
      await SecureStore.setItemAsync("token", token);
      setContextValue({
        ...contextValue,
        token,
      });
    },
    clearToken: async () => {
      await SecureStore.setItemAsync("token", "");
      setContextValue({
        ...contextValue,
        token: "",
      });
    },
  });

  useEffect(async () => {
    let token = await SecureStore.getItemAsync("token");
    if (token) setContextValue({ ...contextValue, token });
    setTokenChecked(true);
  }, []);

  // show welcoming
  if (!tokenChecked) return null;

  const tabBarIconColor = (focused) => {
    return tw.color(focused ? "black" : "gray-400");
  };

  return (
    <TokenContext.Provider value={contextValue}>
      <NavigationContainer>
        {contextValue.token !== "" ? (
          <Tab.Navigator
            screenOptions={{ headerShown: false, tabBarShowLabel: false }}
          >
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Home stroke={tabBarIconColor(focused)} />
                ),
              }}
            />
            <Tab.Screen
              name="Explore"
              component={ExploreStack}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Grid stroke={tabBarIconColor(focused)} />
                ),
              }}
            />
            <Tab.Screen
              name="My Plants"
              component={MyPlantsStack}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Book stroke={tabBarIconColor(focused)} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStack}
              options={{
                tabBarIcon: ({ focused }) => (
                  <User stroke={tabBarIconColor(focused)} />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Sign in" component={SignIn} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </TokenContext.Provider>
  );
}
