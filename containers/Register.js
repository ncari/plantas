import React, { useContext, useState } from "react";
import { View } from "react-native";
import Input from "../components/Input";
import tw from "twrnc";
import * as Device from "expo-device";

import { Register } from "../services/apicall";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import context from "../services/context";

function RegisterScreen() {
  const { setToken } = useContext(context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    // validate

    const { data } = await Register(name, email, password, Device.deviceName);
    setToken(data);
  };

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input label="Nombre" value={name} onChangeText={setName} />
      <Input
        label="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Input label="Repita la contraseña" secureTextEntry value={password} />
      <PrimaryButton
        label="Registrarse"
        style={tw`mt-4`}
        onPress={handleSubmit}
      />
    </View>
  );
}

export default RegisterScreen;
