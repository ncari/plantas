import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity, Pressable } from "react-native";
import tw from "twrnc";
import moment from "moment";

import { Heart } from "react-native-feather";
import { api } from "../config/config";
import ImagePlaceholder from "./ImagePlaceholder";

function PostCard({ data, onInteraction = () => {}, onUser = () => {} }) {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <View
      style={tw`flex-1 p-4 bg-white rounded-tl-sm rounded-tr-lg rounded-br-lg rounded-bl-lg`}
    >
      <View style={tw`flex-row items-center justify-between mb-2`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity onPress={onUser}>
            <Image
              source={require("../assets/blank-profile.png")}
              style={[tw`rounded-full`, { height: 36, width: 36 }]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onUser}>
            <Text style={tw`text-xs ml-2 tracking-tighter`}>
              {data.user.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ImagePlaceholder
        source={{
          uri: `${api}/${data.image_path}`,
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
      <View style={tw`mt-2`}>
        <Text style={tw`text-xs font-bold`}>{data.title}</Text>
      </View>
      {!showDescription ? (
        <Pressable onPress={() => setShowDescription(true)}>
          <Text style={tw`text-xs text-gray-400 font-bold`}>
            Ver descripcion
          </Text>
        </Pressable>
      ) : (
        <Text style={tw`text-xs font-bold`}>{data.description}</Text>
      )}
      <Text style={tw`text-xs text-gray-400 mt-1`}>
        {moment(data.updated_at).fromNow()}
      </Text>
    </View>
  );
}

export default PostCard;
