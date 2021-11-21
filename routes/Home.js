import React, { useState } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Plus } from "react-native-feather";
import tw from "twrnc";

import HomeScreen from "../containers/Home";

const Stack = createStackNavigator();

function HomeStack() {
  const [showModal, setShowModal] = useState(false);

  const handleModalChange = (type) => {
    if (type === "open") setShowModal(true);
    else if (type === "close") setShowModal(false);
    else {
      throw Error("Option not valid");
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="/"
        options={{
          headerTitle: "Home",
          headerRight: () => (
            <View style={tw`p-4`}>
              <Plus
                onPress={() => setShowModal(true)}
                stroke={tw.color("black")}
              />
            </View>
          ),
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            showModal={showModal}
            onModalChange={handleModalChange}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default HomeStack;
