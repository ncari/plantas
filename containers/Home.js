import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";

import NewPostModal from "../components/NewPostModal";
import PostCard from "../components/PostCard";
import UserInfoModal from "../components/UserInfoModal";
import { Get, Patch } from "../services/apicall.js";
import context from "../services/context";

function HomeScreen({
  showModal = false,
  navigation,
  onModalChange = () => {},
}) {
  const [plants, setPlants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { token } = useContext(context);

  useEffect(() => {
    Get("/posts", token)
      .then((data) => setPlants(data))
      .catch((err) => alert(err.message));
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      const data = await Get("/posts", token);
      setPlants(data);
    } catch (err) {
      alert(err.message);
    }

    setRefreshing(false);
  };

  const closeModal = () => {
    onModalChange("close");
  };

  const onPostSuccess = (post) => {
    setPlants([post, ...plants]);
    closeModal();
  };

  const onPostFail = (err) => {
    closeModal();
    alert(err.message);
  };

  const handleAddInteraction = async (id) => {
    const i = plants.findIndex((p) => p.id === id);

    plants[i].interactions_count += 1;
    plants[i].interacted = true;
    setPlants([...plants]);

    try {
      await Patch(`/posts/${id}/interactions/add`, {}, token, false);
    } catch (error) {
      plants[i].interactions_count -= 1;
      plants[i].interacted = false;
      setPlants([...plants]);
      alert(error.message);
    }
  };

  const handleRemoveInteraction = async (id) => {
    const i = plants.findIndex((p) => p.id === id);

    plants[i].interactions_count -= 1;
    plants[i].interacted = false;
    setPlants([...plants]);

    try {
      await Patch(`/posts/${id}/interactions/remove`, {}, token, false);
    } catch (error) {
      plants[i].interactions_count += 1;
      plants[i].interacted = true;
      setPlants([...plants]);
      alert(error.message);
    }
  };

  const handleInteraction = (id) => {
    const post = plants.find((p) => p.id === id);
    if (post && post.interacted) handleRemoveInteraction(id);
    else if (post && !post.interacted) handleAddInteraction(id);
    else throw Error("No post with this id in the state");
  };

  const handlePressUser = async (user_id) => {
    const user = await Get(`/users/${user_id}`, token);
    setSelectedUser(user);
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
        data={plants}
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
