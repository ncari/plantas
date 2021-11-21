import React from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "twrnc";

function PrimaryButton({ label, style, ...props }) {
  return (
    <TouchableOpacity
      style={[
        tw`py-4 px-8 bg-green-600 rounded-lg flex-row justify-center`,
        style,
      ]}
      {...props}
    >
      <Text style={tw`text-white uppercase font-bold`}>{label}</Text>
    </TouchableOpacity>
  );
}

export default PrimaryButton;
