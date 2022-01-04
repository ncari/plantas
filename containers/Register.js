import React, { useState } from "react";
import { View } from "react-native";
import Input from "../components/Input";
import tw from "twrnc";
import * as Device from "expo-device";

import PrimaryButton from "../components/Buttons/PrimaryButton";
import useSetToken from "../services/hooks/useSetToken";
import useError from "../services/hooks/useError";
import useAxios from "../services/hooks/useAxios";

function RegisterScreen() {
  const setToken = useSetToken();
  const error = useError();
  const axios = useAxios();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // validate

    setLoading(true);
    try {
      const { data } = await axios.post("/users/register", {
        name,
        email,
        password,
        device_name: Device.deviceName,
      });
      setToken(data);
    } catch {
      error("Hubo un error al registrarse");
    }
    setLoading(false);
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
        disabled={loading}
      />
    </View>
  );
}

export default RegisterScreen;
