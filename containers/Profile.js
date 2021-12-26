import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import UserMetadata from "../components/UserMetadata";
import tw from "twrnc";

import { Get } from "../services/apicall";
import context from "../services/context";

function ProfileScreen() {
  const { token, setError } = useContext(context);
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    Get("/user", token)
      .then(({ data }) => setData(data))
      .catch((err) => setError());
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const { data } = await Get("/user", token);
      setData(data);
    } catch (err) {
      setError();
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
          <>
            <UserMetadata
              name={data.name}
              followers_count={data.followers_count}
              interactions_count={data.interactions_count}
              posts_count={data.posts_count}
            />
            <View style={tw`my-4 border-b border-gray-100`} />
          </>
        )}

        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          numColumns={3}
          renderItem={() => (
            <View style={tw`bg-gray-200 h-32 w-1/3 rounded mt-1 mr-1`} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;
