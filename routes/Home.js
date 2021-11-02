import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ArticleScreen from "../containers/Article";
import HomeScreen from "../containers/Home";

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="/" component={HomeScreen} />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
