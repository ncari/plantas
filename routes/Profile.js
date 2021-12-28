import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LogOut } from "react-native-feather";
import { View } from "react-native";
import tw from "twrnc";

import ProfileScreen from "../containers/Profile";
import context from "../services/context";

const Stack = createStackNavigator();

function ExploreStack() {
  const { clearToken } = useContext(context);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="/"
        options={{
          headerTitle: "Perfil",
          headerRight: () => (
            <View style={tw`p-4`}>
              <LogOut stroke={tw.color("black")} onPress={clearToken} />
            </View>
          ),
        }}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

export default ExploreStack;
