import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../containers/Profile";

const Stack = createStackNavigator();

function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="/"
        options={{
          headerTitle: "Profile",
        }}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

export default ExploreStack;
