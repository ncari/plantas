import React from "react";
import { Image } from "react-native";

function FindPlantCard() {
  return (
    <Image
      source={require("../assets/rose.jpg")}
      style={{
        width: 120,
        height: 120,
      }}
    />
  );
}

export default FindPlantCard;
