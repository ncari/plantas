import React, { useContext } from "react";
import { Text, View } from "react-native";
import { X } from "react-native-feather";
import tw from "twrnc";

import context from "../services/context";

function ErrorContainer() {
  const { error, clearError } = useContext(context);
  return (
    <>
      {error !== "" && (
        <View
          style={tw`p-4 bg-red-100 justify-between rounded-lg absolute bottom-10 w-11/12 self-center flex-row items-center`}
        >
          <Text style={tw`text-red-400`}>{error}</Text>
          <X stroke={tw.color("red-400")} onPress={clearError} />
        </View>
      )}
    </>
  );
}

export default ErrorContainer;
