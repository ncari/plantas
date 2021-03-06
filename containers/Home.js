import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";

import NewPostModal from "../components/NewPostModal";
import PostCard from "../components/PostCard";
import UserInfoModal from "../components/UserInfoModal";
import useAxios from "../services/hooks/useAxios";
import useError from "../services/hooks/useError";
import usePosts from "../services/hooks/usePosts";

function HomeScreen({
  showModal = false,
  navigation,
  onModalChange = () => {},
}) {
  const error = useError();
  const axios = useAxios();
  const [posts, setPosts, handleInteraction, handleRefresh, refreshing] =
    usePosts();
  const [selectedUser, setSelectedUser] = useState(null);

  const closeModal = () => {
    onModalChange("close");
  };

  const onPostSuccess = (post) => {
    setPosts([post, ...posts]);
    closeModal();
  };

  const onPostFail = (err) => {
    closeModal();
    error();
  };

  const handlePressUser = async (user_id) => {
    const { data } = await axios.get(`/users/${user_id}`);
    setSelectedUser(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Plants list */}
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              marginTop: 75,
            }}
          />
        )}
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            data={item}
            navigation={navigation}
            onInteraction={() => handleInteraction(item.id)}
            onUser={() => handlePressUser(item.user_id)}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
      {/* New Post Modal */}
      <NewPostModal
        visible={showModal}
        onClose={closeModal}
        onPostSuccess={onPostSuccess}
        onPostFail={onPostFail}
      />
      {/* User Info Modal */}
      <UserInfoModal
        visible={selectedUser && true}
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onFollowSuccess={() =>
          setSelectedUser({
            ...selectedUser,
            following: true,
            followers_count: selectedUser.followers_count + 1,
          })
        }
        onUnfollowSuccess={() =>
          setSelectedUser({
            ...selectedUser,
            following: false,
            followers_count: selectedUser.followers_count - 1,
          })
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default HomeScreen;
