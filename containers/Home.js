import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";

import NewPostModal from "../components/NewPostModal";
import PostCard from "../components/PostCard";
import UserInfoModal from "../components/UserInfoModal";
import { Get } from "../services/apicall.js";
import context from "../services/context";
import { usePosts } from "../services/hooks";

function HomeScreen({
  showModal = false,
  navigation,
  onModalChange = () => {},
}) {
  const { token, setError } = useContext(context);
  const [posts, setPosts, handleInteraction] = usePosts();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    Get("/posts", token)
      .then(({ data }) => setPosts(data))
      .catch(() => setError());
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      const { data } = await Get("/posts", token);
      setPosts(data);
    } catch (err) {
      setError();
    }

    setRefreshing(false);
  };

  const closeModal = () => {
    onModalChange("close");
  };

  const onPostSuccess = (post) => {
    setPosts([post, ...posts]);
    closeModal();
  };

  const onPostFail = (err) => {
    closeModal();
    setError();
  };

  const handlePressUser = async (user_id) => {
    const { data } = await Get(`/users/${user_id}`, token);
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
