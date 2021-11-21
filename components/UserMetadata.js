import React from "react";
import { Text, View, Image } from "react-native";
import tw from "twrnc";

import Profile from "../assets/profile.jpg";

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
        style={[tw`rounded-full`, { height: 48, width: 48 }]}
      />
      <Text style={tw`font-bold text-lg`}>{name}</Text>
      <View style={tw`flex-row mt-2 mt-4`}>
        <View style={tw`p-4 rounded-lg bg-gray-100`}>
          <Text style={tw`font-bold text-lg text-yellow-600`}>
            {posts_count}
          </Text>
          <Text style={tw`font-bold text-green-800 lowercase`}>Posts</Text>
        </View>
        <View style={tw`p-4 rounded-lg bg-gray-100 ml-2`}>
          <Text style={tw`font-bold text-lg text-yellow-400`}>
            {interactions_count}
          </Text>
          <Text style={tw`font-bold text-green-800 lowercase`}>
            Interactions
          </Text>
        </View>
        <View style={tw`p-4 rounded-lg bg-gray-100 ml-2`}>
          <Text style={tw`font-bold text-lg text-purple-400`}>
            {followers_count}
          </Text>
          <Text style={tw`font-bold text-green-800 lowercase`}>Followers</Text>
        </View>
      </View>
    </View>
  );
}

export default UserMetadata;
