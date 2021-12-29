import React from "react";
import { Text, View, FlatList, Image } from "react-native";
import { Bookmark, ChevronDown, Circle, Eye } from "react-native-feather";
import tw from "twrnc";

import { baseUrl } from "../config/config";

function ExploreScreen({ navigation, articles, loading, onRefresh }) {
  const renderItem = ({ item }) => (
    <View style={tw`p-4`}>
      <View style={tw`flex-row items-center justify-between mb-2`}>
        <View style={tw`flex-row items-center`}>
          <Image
            source={require("../assets/blank-profile.png")}
            style={[tw`rounded-full`, { height: 36, width: 36 }]}
          />
          <Text style={tw`text-xs ml-2 tracking-tighter`}>Jane Doe</Text>
          <Text style={tw`text-xs ml-2 text-gray-400 tracking-tighter mr-2`}>
            2 Julio
          </Text>
          <Circle fill={tw.color("gray-400")} width={6} height={6} />
          <Text style={tw`text-xs ml-2 text-gray-400 tracking-tighter`}>
            3 min read
          </Text>
        </View>
        <Bookmark stroke={tw.color("green-600")} />
      </View>
      <Image
        source={{
          uri: `${baseUrl}/${item.image_path}`,
        }}
        style={[tw`rounded-lg w-full mb-2`, { height: 200 }]}
      />
      <Text style={tw`text-xl font-bold mb-3`}>{item.title}</Text>
      <Text style={tw`mb-2`}>{item.resume}</Text>
      <View style={tw`flex-row justify-between`}>
        <View style={tw`flex-row items-center`}>
          <Eye stroke={tw.color("green-600")} />
          <Text style={tw`ml-1 text-black`}>36</Text>
        </View>
        <ChevronDown
          stroke={tw.color("gray-400")}
          onPress={() => {
            navigation.navigate("Article", { article: item, name: item.title });
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={tw`border-b border-gray-100 mx-4`} />
        )}
        refreshing={loading}
        onRefresh={onRefresh}
      />
    </View>
  );
}

export default ExploreScreen;
