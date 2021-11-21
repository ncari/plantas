import React from "react";
import { View, Text, TextInput } from "react-native";
import tw from "twrnc";

function Input({ label, style, ...props }) {
  return (
    <View>
      <Text style={tw`text-gray-600 mt-4 text-xs font-bold`}>{label}</Text>
      <TextInput
        style={[tw`p-2 bg-gray-100 rounded-xl mt-2`, style]}
        {...props}
      />
    </View>
  );
}

export default Input;
