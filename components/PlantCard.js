import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "twrnc";

import { api } from "../config/config";

function PlantCard({
  name,
  water_ml,
  sun_c,
  temperature_c,
  image_path,
  onShowDetails,
}) {
  return (
    <View>
      <Pressable onPress={onShowDetails}>
        <Text style={tw`text-gray-600 font-bold mb-2 text-lg`}>{name}</Text>
      </Pressable>
      <View style={tw`flex-row justify-between`}>
        <Image
          source={{
            uri: `${api}/${image_path}`,
          }}
          style={[tw`rounded-lg`, { height: 185, width: 150 }]}
        />
        <View style={tw`justify-center`}>
          <Text>{water_ml} ml</Text>
          <Text style={tw`my-2`}>{sun_c}°</Text>
          <Text>{temperature_c}°</Text>
        </View>
        <View style={tw`justify-center`}>
          <TouchableOpacity
            style={tw`rounded-full h-24 w-24 border-2 border-green-600 justify-center items-center`}
          >
            <Text style={tw`text-green-600`}>Grow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default PlantCard;
