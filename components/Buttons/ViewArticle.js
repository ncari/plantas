import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

function ViewArticleButton({ onPress = () => {} }) {
  return (
    <TouchableOpacity
      style={tw`px-4 py-3 border border-green-600 bg-transparent  rounded-tl-2xl rounded-tr-md rounded-bl-2xl rounded-br-2xl`}
      onPress={onPress}
    >
      <Text style={tw`text-center text-green-600`}>View Article</Text>
    </TouchableOpacity>
  );
}

export default ViewArticleButton;
