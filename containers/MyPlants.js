import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";

import PlantCard from "../components/PlantCard";
import WeekTimeline from "../components/WeekTimeline";
import { Get } from "../services/apicall";
import context from "../services/context";

function MyPlantsScreen({ navigation, route }) {
  const { token, setError } = useContext(context);
  const [loading, setLoading] = useState(false);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    if (route.params && route.params.plant) {
      setPlants([route.params.plant, ...plants]);
    }
  }, [route.params && route.params.plant]);

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

  return (
    <View style={tw`flex-1 bg-white px-4`}>
      <FlatList
        data={plants}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={tw`mt-5`} />}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <PlantCard
            {...item}
            onShowDetails={() =>
              navigation.navigate("PlantDetails", {
                id: item.id,
                name: item.name,
              })
            }
          />
        )}
        onRefresh={handleRefresh}
        refreshing={loading}
        ListHeaderComponent={() => (
          <>
            <WeekTimeline styles={tw`mt-4`} />
            <View style={tw`border-b border-b-gray-100 my-4`} />
          </>
        )}
      />
    </View>
  );
}

export default MyPlantsScreen;
