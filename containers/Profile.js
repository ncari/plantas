import React, { useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import UserMetadata from "../components/UserMetadata";
import tw from "twrnc";

import { Get } from "../services/apicall";
import context from "../services/context";

function ProfileScreen() {
  const { token, clearToken } = useContext(context);
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    Get("/user", token)
      .then((data) => setData(data))
      .catch((err) => alert(err.message));
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await Get("/user", token);
      setData(data);
    } catch (err) {
      alert(err.message);
    }
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView
        contentContainerStyle={tw`p-4`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {data && (
          <UserMetadata
            name={data.name}
            followers_count={data.followers_count}
            interactions_count={data.interactions_count}
            posts_count={data.posts_count}
          />
        )}
        <View style={tw`mt-8`}>
          <Text style={tw`font-bold text-green-800`}>My posts</Text>
          <Text>Here goes list</Text>
        </View>

        <View style={tw`mt-8`}>
          <Text style={tw`font-bold text-green-800`}>My articles</Text>
          <Text>Here goes list</Text>
        </View>
        <TouchableOpacity
          style={tw`p-2 border border-red-400 rounded mt-4`}
          onPress={clearToken}
        >
          <Text style={tw`text-red-400 uppercase text-center`}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;
