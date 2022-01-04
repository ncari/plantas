import React from "react";
import { Text, View } from "react-native";
import { X } from "react-native-feather";
import tw from "twrnc";

import useErrorMsg from "../services/hooks/useErrorMsg";

function ErrorContainer() {
  const { error_msg, clear } = useErrorMsg();
  return (
    <>
      {error_msg !== "" && (
        <View
          style={tw`p-4 bg-red-100 justify-between rounded-lg absolute bottom-10 w-11/12 self-center flex-row items-center`}
        >
          <Text style={tw`text-red-400`}>{error_msg}</Text>
          <X stroke={tw.color("red-400")} onPress={clear} />
        </View>
      )}
    </>
  );
}

export default ErrorContainer;
