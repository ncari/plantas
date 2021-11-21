import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

function WeekTimeline({ styles }) {
  return (
    <View style={[tw`flex-row justify-between`, styles]}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <View key={i} style={tw`items-center`}>
          <Text style={tw`mb-2 text-xs font-bold`}>{days[i]}</Text>
          <View style={tw`w-8 h-8 border border-gray-400 rounded-full`} />
        </View>
      ))}
    </View>
  );
}

export default WeekTimeline;
