import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Modal as M,
  TouchableOpacity,
  Text,
} from "react-native";
import { X } from "react-native-feather";
import tw from "twrnc";

function Modal({ visible, children, onClose }) {
  return (
    <>
      <M visible={visible} transparent statusBarTranslucent>
        <View style={tw`h-full bg-black opacity-50`} />
      </M>
      <M visible={visible} transparent animationType="slide">
        <View style={tw`h-3/4 mt-auto z-10`}>
          <SafeAreaView style={tw`flex-1 bg-white`}>
            <ScrollView contentContainerStyle={tw`p-4`}>
              <X
                stroke={tw.color("black")}
                style={tw`self-end`}
                onPress={onClose}
              />
              {children}
            </ScrollView>
          </SafeAreaView>
        </View>
      </M>
    </>
  );
}

export default Modal;
