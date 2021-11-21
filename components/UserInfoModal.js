import React, { useContext } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";

import { Put } from "../services/apicall";
import context from "../services/context";
import UserMetadata from "./UserMetadata";
import Modal from "./Modal";

function UserInfoModal({
  user,
  visible,
  onFollowSuccess = () => {},
  onUnfollowSuccess = () => {},
  onClose = () => {},
  // onError = () => {},
}) {
  const { token } = useContext(context);

  const unfollow = async () => {
    await Put(
      "/users/followers/unfollow",
      JSON.stringify({
        id: user.id,
      }),
      token,
      false
    );
    onUnfollowSuccess();
  };

  const follow = async () => {
    await Put(
      "/users/followers/follow",
      JSON.stringify({
        id: user.id,
      }),
      token,
      false
    );
    onFollowSuccess();
  };
  return (
    <Modal visible={visible} onClose={onClose}>
      <View>
        {user && (
          <View style={tw`mt-4 items-center`}>
            <UserMetadata
              name={user.name}
              followers_count={user.followers_count}
              interactions_count={user.interactions_count}
              posts_count={user.posts_count}
            />
            <Text>{user.followed_by && "Follows you"}</Text>

            <TouchableOpacity
              style={tw`p-2 bg-green-600 rounded-xl`}
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
