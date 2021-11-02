import React from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from "react-native";
import FindPlantCard from "../components/FindPlantCard";

const requests = [
  {
    id: 1,
    image: "image_path",
  },
  {
    id: 2,
    image: "image_path",
  },
  {
    id: 3,
    image: "image_path",
  },
  {
    id: 4,
    image: "image_path",
  },
  {
    id: 5,
    image: "image_path",
  },
  {
    id: 6,
    image: "image_path",
  },
  {
    id: 7,
    image: "image_path",
  },
  {
    id: 8,
    image: "image_path",
  },
  {
    id: 9,
    image: "image_path",
  },
  {
    id: 10,
    image: "image_path",
  },
];

function FindPlant() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/exploreBackground.jpg")}
        resizeMode="cover"
        style={styles.background}
      >
        <FlatList
          key={2}
          numColumns={2}
          ItemSeparatorComponent={() => (
            <View
              style={{
                marginTop: 10,
              }}
            />
          )}
          data={requests}
          renderItem={({ item, index }) => (
            <View style={index % 2 == 0 && { marginRight: 10 }}>
              <FindPlantCard />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  background: {
    flex: 1,
  },
});

export default FindPlant;
