import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import PlantCard from "../components/PlantsCard";

function HomeScreen({ navigation }) {
  const [plants, setPlants] = useState([0, 1, 2]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              marginTop: 75,
            }}
          />
        )}
        data={plants}
        renderItem={() => <PlantCard navigation={navigation} />}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default HomeScreen;
