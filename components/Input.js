import React from "react";
import { View, Text, TextInput } from "react-native";
import tw from "twrnc";

function Input({ label, error, style, ...props }) {
  return (
    <View>
      <Text
        style={[
          tw`text-gray-600 mt-4 text-xs font-bold`,
          error && tw`text-red-400`,
        ]}
      >
        {label}
      </Text>
      <TextInput
        style={[
          tw`p-2 bg-gray-100 rounded-xl mt-2`,
          error && tw`border border-red-400`,
          style,
        ]}
        {...props}
      />
    </View>
  );
}

export default Input;
