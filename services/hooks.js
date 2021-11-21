import React, { useState } from "react";
import { Platform, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";

export const useImagePicker = (aspect = [4, 3]) => {
  const [image, setImage] = useState(null);

  const clear = () => setImage(null);

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: aspect,
          quality: 1,
          base64: true,
        });

        if (!result.cancelled) {
          setImage({ uri: result.uri, type: result.type });
        }
      }
    }
  };

  return [image, pickImage, clear];
};
