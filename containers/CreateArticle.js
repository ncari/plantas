import React, { useRef, useState } from "react";
import {
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import tw from "twrnc";

import Input from "../components/Input";
import useError from "../services/hooks/useError";
import useImagePicker from "../services/hooks/useImagePicker";
import { createFormData } from "../utils/helpers";
import useAxios from "../services/hooks/useAxios";

function CreateArticleScreen({ navigation }) {
  const error = useError();
  const [image, pickImageHandler] = useImagePicker([4, 3]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const RichText = useRef(); //reference to the RichEditor component
  const [body, setBody] = useState("");

  const nextIsValid = () => {
    return image && title && resume;
  };

  const next = () => {
    setShowModal(true);
  };

  const publish = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/articles",
        createFormData(image, {
          title,
          resume,
          body,
        }),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigation.navigate({
        name: "/",
        params: { article: data },
        merge: true,
      });
    } catch (err) {
      error();
    }
    setLoading(false);
  };

  return (
    <ScrollView style={tw`bg-white px-4`}>
      {!image ? (
        <TouchableOpacity
          onPress={pickImageHandler}
          style={[tw`mt-4 rounded-lg bg-gray-100 p-24`]}
        >
          <Text style={tw`text-gray-600 font-bold text-center`}>
            Elige una imagen
          </Text>
        </TouchableOpacity>
      ) : (
        <Image
          source={{ uri: image.uri }}
          style={[tw`self-center rounded-lg`, { height: 185, width: "100%" }]}
        />
      )}
      <Input label="Titulo" onChangeText={setTitle} />
      <Input
        label="Breve resumen"
        multiline
        numberOfLines={5}
        textAlignVertical="top"
        onChangeText={setResume}
      />
      <TouchableOpacity
        onPressIn={next}
        style={tw`my-4 border border-green-600 px-4 py-2 rounded-lg self-center`}
        disabled={!nextIsValid()}
      >
        <Text style={tw`text-green-600 text-center`}>Siguiente</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="fade">
        <View style={tw`flex-1 bg-white`}>
          <View style={tw`flex-row justify-between p-4 items-center`}>
            <Text style={tw`flex-1`} numberOfLines={1}>
              {title}
            </Text>
            <TouchableOpacity onPress={publish} disabled={loading}>
              <Text style={tw`text-green-600 ml-4`}>Publicar</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`border-b border-gray-100`} />
          <RichEditor
            disabled={false}
            ref={RichText}
            style={tw`flex-1 px-2`}
            placeholder={"Comienza ha escribir aqui"}
            onChange={setBody}
          />
          <RichToolbar
            editor={RichText}
            selectedIconTint={tw.color("black")}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.insertBulletsList,
              actions.insertOrderedList,
            ]}
            disabled={false}
            iconSize={16}
          />
        </View>
      </Modal>
    </ScrollView>
  );
}

export default CreateArticleScreen;
