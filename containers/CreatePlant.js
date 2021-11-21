import React, { useContext, useState } from "react";
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
import { PostImage } from "../services/apicall";
import context from "../services/context";
import { useImagePicker } from "../services/hooks";
import { createFormData } from "../utils/helpers";

function CreatePlantScreen({ onNewPlantSuccess, navigation }) {
  const { token } = useContext(context);
  const [name, setName] = useState("");
  const [water, setWater] = useState(0);
  const [sun, setSun] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [image, pickImageHandler] = useImagePicker([3, 4]);

  const submitHandler = async () => {
    try {
      const plant = await PostImage(
        "/plants",
        createFormData(image, {
          name: name,
          water_ml: water[0],
          sun_c: sun[0],
          temperature_c: temperature[0],
        }),
        token
      );
      onNewPlantSuccess(plant);
      navigation.goBack();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScrollView>
      <View style={tw`flex-1 p-4 bg-white`}>
        {!image ? (
          <TouchableOpacity
            onPress={pickImageHandler}
            style={[tw`rounded-lg bg-gray-100 p-24 self-center`]}
          >
            <Text style={tw`text-gray-600 font-bold`}>Pick an image</Text>
          </TouchableOpacity>
        ) : (
          <Image
            source={{ uri: image.uri }}
            style={[tw`self-center rounded-lg`, { height: 185, width: 125 }]}
          />
        )}

        <Input label="Name plant" value={name} onChangeText={setName} />
        <Input label="Subfamily" />

        {/* Minimal water on the day*/}
        <View style={tw`mt-8 mb-2`}>
          <Text style={tw`text-gray-400 text-xs`}>
            Minimal water on the day
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
          <Text style={tw`text-gray-400 text-xs`}>Comfort sun</Text>
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
              <Text style={tw`self-center`}>{sun}°</Text>
            </View>
          </View>
        </View>

        {/* Comfort temperature */}
        <View style={tw`mt-2 mb-8`}>
          <Text style={tw`text-gray-400 text-xs`}>Comfort temperature</Text>
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
              <Text style={tw`self-center`}>{temperature}°</Text>
            </View>
          </View>
        </View>
        <PrimaryButton label="Save" onPress={submitHandler} />
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
