import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LogOut } from "react-native-feather";
import { View } from "react-native";
import tw from "twrnc";

import ProfileScreen from "../containers/Profile";
import useLogout from "../services/hooks/useLogout";

const Stack = createStackNavigator();

function ExploreStack() {
  const logout = useLogout();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="/"
        options={{
          headerTitle: "Perfil",
          headerRight: () => (
            <View style={tw`p-4`}>
              <LogOut stroke={tw.color("black")} onPress={logout} />
            </View>
          ),
        }}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

export default ExploreStack;
