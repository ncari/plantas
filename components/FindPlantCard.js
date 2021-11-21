import React from "react";
import { Image } from "react-native";

import Rose from "../assets/rose.jpg";

function FindPlantCard() {
  return (
    <Image
      source={Rose}
      style={{
        width: 120,
        height: 120,
      }}
    />
  );
}

export default FindPlantCard;
