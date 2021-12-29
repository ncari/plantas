import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import tw from "twrnc";
import moment from "moment";
import { Heart } from "react-native-feather";

import Profile from "../assets/blank-profile.png";
import { baseUrl } from "../config/config";

function PostCard({ data, onInteraction = () => {}, onUser = () => {} }) {
  return (
    <View
      style={tw`flex-1 p-4 bg-white rounded-tl-sm rounded-tr-lg rounded-br-lg rounded-bl-lg`}
    >
      <View style={tw`flex-1 flex-row mb-2`}>
        <View style={tw`flex-1 flex-row`}>
          <TouchableOpacity onPress={onUser}>
            <Image
              source={Profile}
              style={[
                tw`rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-sm`,
                { height: 48, width: 48 },
              ]}
            />
          </TouchableOpacity>
          <Text style={tw`flex-1 ml-2 font-bold`}>{data.title}</Text>
        </View>
        <View>
          <Text>..</Text>
        </View>
      </View>
      <Image
        source={{
          uri: `${baseUrl}/${data.image_path}`,
        }}
        style={[
          tw`w-full rounded-tl-sm rounded-tr-xl rounded-bl-xl rounded-br-sm`,
          { height: 200 },
        ]}
      />
      <View style={tw`flex-row justify-between items-center mt-2`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity onPress={onInteraction}>
            <Heart
              fill={tw.color(data.interacted ? "red-600" : "white")}
              stroke={tw.color(data.interacted ? "red-600" : "black")}
            />
          </TouchableOpacity>
          <Text style={tw`ml-1 text-gray-400 text-xs`}>
            {data.interactions_count}
          </Text>
        </View>
      </View>
      <Text style={tw`text-xs text-gray-400 mt-1`}>
        {moment(data.updated_at).fromNow()}
      </Text>
    </View>
  );
}

export default PostCard;
