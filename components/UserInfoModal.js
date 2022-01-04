import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";

import UserMetadata from "./UserMetadata";
import Modal from "./Modal";
import useAxios from "../services/hooks/useAxios";

function UserInfoModal({
  user,
  visible,
  onFollowSuccess = () => {},
  onUnfollowSuccess = () => {},
  onClose = () => {},
  // onError = () => {},
}) {
  const axios = useAxios();

  const unfollow = async () => {
    await axios.put("/users/followers/unfollow", { id: user.id });
    onUnfollowSuccess();
  };

  const follow = async () => {
    await axios.put("/users/followers/follow", { id: user.id });
    onFollowSuccess();
  };
  return (
    <Modal visible={visible} onClose={onClose}>
      <View>
        {user && (
          <View style={tw`mt-4`}>
            <UserMetadata
              name={user.name}
              followers_count={user.followers_count}
              interactions_count={user.interactions_count}
              posts_count={user.posts_count}
            />
            <Text>{user.followed_by && "Follows you"}</Text>

            <TouchableOpacity
              style={tw`p-2 bg-green-600 rounded-xl self-center`}
              onPress={user.following ? unfollow : follow}
            >
              <Text style={tw`text-white uppercase`}>
                {user.following ? "Unfollow" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}

export default UserInfoModal;
