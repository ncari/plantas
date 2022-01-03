import React, { useEffect, useState } from "react";
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

import { createFormData } from "../utils/helpers";
import Input from "./Input";
import Modal from "./Modal";
import useError from "../services/hooks/useError";
import useAxios from "../services/hooks/useAxios";

function NewPostModal({
  visible,
  onClose = () => {},
  onPostSuccess = () => {},
  onPostFail = () => {},
}) {
  const error = useError();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setFormErrors] = useState({
    title: false,
    description: false,
    image: false,
  });
  const axios = useAxios();

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        error(
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
    setFormErrors({
      title: false,
      description: false,
      image: false,
    });
  }, [visible]);

  const formIsValid = () => {
    let valid = true;
    if (!title) {
      setFormErrors((e) => ({ ...e, title: true }));
      valid = false;
    }
    if (!description) {
      setFormErrors((e) => ({ ...e, description: true }));
      valid = false;
    }
    if (!image) {
      setFormErrors((e) => ({ ...e, image: true }));
      valid = false;
    }
    return valid;
  };

  const post = async () => {
    if (!formIsValid()) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
        "/posts",
        createFormData(image, {
          title,
          description,
        }),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
        <Input
          label="Titulo"
          onChangeText={setTitle}
          value={title}
          error={errors.title}
        />
        <Input
          label="Descripcion"
          onChangeText={setDescription}
          value={description}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          error={errors.description}
        />
      </View>

      <View style={tw`my-4`}>
        {!image ? (
          <TouchableOpacity
            onPress={pickImage}
            style={[
              tw`rounded-md bg-gray-100 p-24 items-center justify-center`,
              errors.image && tw`border border-red-400`,
            ]}
          >
            <Text style={tw`text-gray-600 font-bold`}>Elige una imagen</Text>
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
            <Text style={tw`text-white uppercase font-bold`}>Aceptar</Text>
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default NewPostModal;
