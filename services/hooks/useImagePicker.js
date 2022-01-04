import { useState } from "react";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useError from "./useError";

export const useImagePicker = (aspect = [4, 3]) => {
  const [image, setImage] = useState(null);
  const error = useError();

  const clear = () => setImage(null);

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        error("Lo sentimos, necesitamos permisos de la camara para continuar");
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

export default useImagePicker;
