import React from "react";
import { Text, View, Image } from "react-native";
import tw from "twrnc";

import Profile from "../assets/blank-profile.png";

function UserMetadata({
  name = "",
  posts_count,
  interactions_count,
  followers_count,
}) {
  return (
    <View>
      <Image
        source={Profile}
        style={[tw`self-center rounded-full`, { height: 48, width: 48 }]}
      />
      <Text style={tw`self-center font-bold text-lg`}>{name}</Text>
      <View style={tw`flex-row mt-4 justify-evenly`}>
        <Text style={tw`text-xs text-gray-400`}>{posts_count} posts</Text>
        <Text style={tw`text-xs text-gray-400`}>
          {interactions_count} interacciones
        </Text>
        <Text style={tw`text-xs text-gray-400`}>
          {followers_count} seguidores
        </Text>
      </View>
    </View>
  );
}

export default UserMetadata;
