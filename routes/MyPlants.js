import React, { useState, useEffect, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { Plus, Calendar } from "react-native-feather";
import tw from "twrnc";

import MyPlantsScreen from "../containers/MyPlants.js";
import CreatePlantScreen from "../containers/CreatePlant.js";
import CalendarScreen from "../containers/Calendar.js";
import context from "../services/context.js";
import { Get } from "../services/apicall.js";
import PlantDetails from "../containers/PlantDetails.js";

const Stack = createStackNavigator();

function MyPlantsStack() {
  const { token, setError } = useContext(context);
  const [loading, setLoading] = useState(false);
  const [plants, setPlants] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await Get("/plants", token);
      setPlants(data);
    } catch (error) {
      setError();
    }
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const { data } = await Get("/plants", token);
      setPlants(data);
    } catch (error) {
      setError();
    }
    setLoading(false);
  };

  const onNewPlantHandler = (plant) => {
    setPlants([plant, ...plants]);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="/"
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
      >
        {(props) => (
          <MyPlantsScreen
            {...props}
            plants={plants}
            loading={loading}
            onRefresh={handleRefresh}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="CreatePlant"
        options={{ headerTitle: "Nueva Planta" }}
      >
        {(props) => (
          <CreatePlantScreen {...props} onNewPlantSuccess={onNewPlantHandler} />
        )}
      </Stack.Screen>

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
