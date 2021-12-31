import React from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import tw from "twrnc";

import useGetData from "../services/hooks/useGetData";
import UserMetadata from "../components/UserMetadata";

function ProfileScreen() {
  const [user, setUser, handleRefresh, refreshing] = useGetData("/user");

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView
        contentContainerStyle={tw`p-4`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {user && (
          <>
            <UserMetadata
              name={user.name}
              followers_count={user.followers_count}
              interactions_count={user.interactions_count}
              posts_count={user.posts_count}
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
