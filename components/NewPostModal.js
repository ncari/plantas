import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";

import { PostImage } from "../services/apicall";
import { createFormData } from "../utils/helpers";
import context from "../services/context";
import Input from "./Input";
import Modal from "./Modal";

function NewPostModal({
  visible,
  onClose = () => {},
  onPostSuccess = () => {},
  onPostFail = () => {},
}) {
  const { token, setError } = useContext(context);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        setError(
          "Lo sientimos. Neceistamos permisos de la camara para continuar."
        );
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });

        if (!result.cancelled) {
          setImage({ uri: result.uri, type: result.type });
        }
      }
    }
  };

  useEffect(() => {
    setImage(null);
    setTitle("");
    setDescription("");
  }, [visible]);

  const post = async () => {
    setLoading(true);

    try {
      const { data } = await PostImage(
        "/posts",
        createFormData(image, {
          title,
          description,
        }),
        token
      );
      onPostSuccess(data);
    } catch (err) {
      onPostFail(err);
    }

    setLoading(false);
  };

  const close = () => {
    onClose();
  };

  return (
    <Modal visible={visible} onClose={close}>
      <View>
        <Input label="Title" onChangeText={setTitle} value={title} />
        <Input
          label="Description"
          onChangeText={setDescription}
          value={description}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View>

      <View style={tw`my-4`}>
        {!image ? (
          <TouchableOpacity
            onPress={pickImage}
            style={tw`rounded-md bg-gray-100 p-24 items-center justify-center`}
          >
            <Text style={tw`text-gray-600 font-bold`}>Pick an image</Text>
          </TouchableOpacity>
        ) : (
          <Image source={{ uri: image.uri }} style={{ height: 200 }} />
        )}
      </View>
      <View style={tw`items-center`}>
        <TouchableOpacity
          style={tw`py-4 px-8 bg-green-600 rounded-lg w-full flex-row justify-center`}
          onPress={post}
          disabled={loading}
        >
          <ActivityIndicator
            animating={loading}
            color={"white"}
            hidesWhenStopped
          />
          {!loading && (
            <Text style={tw`text-white uppercase font-bold`}>Post</Text>
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default NewPostModal;
