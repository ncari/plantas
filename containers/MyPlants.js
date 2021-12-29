import React from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";

import PlantCard from "../components/PlantCard";
import WeekTimeline from "../components/WeekTimeline";

function MyPlantsScreen({ plants, loading, onRefresh, navigation }) {
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
        onRefresh={onRefresh}
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
