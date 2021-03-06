import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import tw from "twrnc";

import PrimaryButton from "../components/Buttons/PrimaryButton";
import Input from "../components/Input";
import useImagePicker from "../services/hooks/useImagePicker";
import useError from "../services/hooks/useError";
import { createFormData } from "../utils/helpers";
import useAxios from "../services/hooks/useAxios";

function CreatePlantScreen({ navigation }) {
  const error = useError();
  const [name, setName] = useState("");
  const [water, setWater] = useState([0]);
  const [sun, setSun] = useState([0]);
  const [temperature, setTemperature] = useState([0]);
  const [image, pickImageHandler] = useImagePicker([3, 4]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const formIsValid = () => {
    return image && name;
  };

  const submitHandler = async () => {
    if (!formIsValid()) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
        "/plants",
        createFormData(image, {
          name: name,
          water_ml: water[0],
          sun_c: sun[0],
          temperature_c: temperature[0],
        }),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigation.navigate({
        name: "/",
        params: { plant: data },
        merge: true,
      });
    } catch (err) {
      error();
    }
    setLoading(false);
  };

  return (
    <ScrollView>
      <View style={tw`flex-1 p-4 bg-white`}>
        {!image ? (
          <TouchableOpacity
            onPress={pickImageHandler}
            style={[tw`rounded-lg bg-gray-100 p-24 self-center`]}
          >
            <Text style={tw`text-gray-600 font-bold`}>Elige una imagen</Text>
          </TouchableOpacity>
        ) : (
          <Image
            source={{ uri: image.uri }}
            style={[tw`self-center rounded-lg`, { height: 185, width: 125 }]}
          />
        )}

        <Input
          label="Nombre de la planta"
          value={name}
          onChangeText={setName}
        />

        {/* Minimal water on the day*/}
        <View style={tw`mt-8 mb-2`}>
          <Text style={tw`text-gray-400 text-xs`}>
            Minima cantidad de agua en el dia
          </Text>
          <View style={tw`flex-row items-center justify-between`}>
            <Slider
              value={water}
              step={1}
              maximumValue={3000}
              onSlidingComplete={setWater}
              containerStyle={tw`w-4/5`}
              animateTransitions
              minimumTrackTintColor={tw.color("green-600")}
              maximumTrackTintColor={tw.color("gray-200")}
              thumbStyle={tw`bg-green-600`}
              trackStyle={tw`h-0.5 rounded-sm`}
            />
            <View style={tw`w-1/5`}>
              <Text style={tw`self-center`}>{water} ml</Text>
            </View>
          </View>
        </View>

        {/* Comfort sun */}
        <View style={tw`mt-2 mb-2`}>
          <Text style={tw`text-gray-400 text-xs`}>Sol aceptable</Text>
          <View style={tw`flex-row items-center justify-between`}>
            <Slider
              containerStyle={tw`w-4/5`}
              value={sun}
              step={1}
              maximumValue={100}
              onSlidingComplete={setSun}
              animateTransitions
              minimumTrackTintColor={tw.color("green-600")}
              maximumTrackTintColor={tw.color("gray-200")}
              thumbStyle={tw`bg-green-600`}
              trackStyle={tw`h-0.5 rounded-sm`}
            />
            <View style={tw`w-1/5`}>
              <Text style={tw`self-center`}>{sun}??</Text>
            </View>
          </View>
        </View>

        {/* Comfort temperature */}
        <View style={tw`mt-2 mb-8`}>
          <Text style={tw`text-gray-400 text-xs`}>Temperatura aceptable</Text>
          <View style={tw`flex-row items-center justify-between`}>
            <Slider
              containerStyle={tw`w-4/5`}
              value={temperature}
              step={1}
              maximumValue={100}
              onSlidingComplete={setTemperature}
              animateTransitions
              minimumTrackTintColor={tw.color("green-600")}
              maximumTrackTintColor={tw.color("gray-200")}
              thumbStyle={tw`bg-green-600`}
              trackStyle={tw`h-0.5 rounded-sm`}
            />
            <View style={tw`w-1/5`}>
              <Text style={tw`self-center`}>{temperature}??</Text>
            </View>
          </View>
        </View>
        <PrimaryButton
          label="Guardar"
          onPress={submitHandler}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
}

export const iosStyles = StyleSheet.create({
  thumb: {
    backgroundColor: "#ffffff",
    borderRadius: 30 / 2,
    height: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    width: 30,
  },
});

export default CreatePlantScreen;
