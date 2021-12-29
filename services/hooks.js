import { useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import context from "./context";
import { Get, Patch } from "./apicall";

export const useImagePicker = (aspect = [4, 3]) => {
  const [image, setImage] = useState(null);
  const { setError } = useContext(context);

  const clear = () => setImage(null);

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        setError(
          "Lo sentimos, necesitamos permisos de la camara para continuar"
        );
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

export const usePosts = () => {
  const { token, setError } = useContext(context);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Get("/posts", token)
      .then(({ data }) => setPosts(data))
      .catch(() => setError());
  }, []);

  const handleAddInteraction = async (id) => {
    const i = posts.findIndex((p) => p.id === id);

    posts[i].interactions_count += 1;
    posts[i].interacted = true;
    setPosts([...posts]);

    try {
      await Patch(`/posts/${id}/interactions/add`, {}, token, false);
    } catch (error) {
      posts[i].interactions_count -= 1;
      posts[i].interacted = false;
      setPosts([...posts]);
      setError();
    }
  };

  const handleRemoveInteraction = async (id) => {
    const i = posts.findIndex((p) => p.id === id);

    posts[i].interactions_count -= 1;
    posts[i].interacted = false;
    setPosts([...posts]);

    try {
      await Patch(`/posts/${id}/interactions/remove`, {}, token, false);
    } catch (error) {
      posts[i].interactions_count += 1;
      posts[i].interacted = true;
      setPosts([...posts]);
      setError();
    }
  };

  const handleInteraction = (id) => {
    const post = posts.find((p) => p.id === id);
    if (post && post.interacted) handleRemoveInteraction(id);
    else if (post && !post.interacted) handleAddInteraction(id);
    else throw Error("No post with this id in the state");
  };

  return [posts, setPosts, handleInteraction];
};
