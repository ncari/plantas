import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { Plus, Calendar } from "react-native-feather";
import tw from "twrnc";

import MyPlantsScreen from "../containers/MyPlants.js";
import CreatePlantScreen from "../containers/CreatePlant.js";
import CalendarScreen from "../containers/Calendar.js";
import PlantDetails from "../containers/PlantDetails.js";

const Stack = createStackNavigator();

function MyPlantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="/"
        component={MyPlantsScreen}
        options={({ navigation }) => ({
          headerTitle: "Mis plantas",
          headerRight: () => (
            <View style={tw`flex-row p-4`}>
              <Calendar
                onPress={() => navigation.navigate("Calendar")}
                stroke={tw.color("black")}
                style={tw`mr-4`}
              />
              <Plus
                onPress={() => navigation.navigate("CreatePlant")}
                stroke={tw.color("black")}
              />
            </View>
          ),
        })}
      />

      <Stack.Screen
        name="CreatePlant"
        component={CreatePlantScreen}
        options={{ headerTitle: "Nueva Planta" }}
      />

      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerTitle: "Calendario" }}
      />
      <Stack.Screen
        name="PlantDetails"
        component={PlantDetails}
        options={({ route }) => ({ headerTitle: route.params.name })}
      />
    </Stack.Navigator>
  );
}

export default MyPlantsStack;
