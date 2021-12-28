import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import * as Device from "expo-device";

import PrimaryButton from "../components/Buttons/PrimaryButton";
import Input from "../components/Input";
import TokenContext from "../services/context";
import { Login } from "../services/apicall";

function SignIn({ navigation }) {
  const { setToken, setError } = useContext(TokenContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const validate = () => {
    const ok = true;

    setErrors({
      email: false,
      password: false,
    });

    return ok;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await Login(email, password, Device.deviceName);
      setToken(data);
    } catch {
      setError("Usuario y/o contraseña incorrectos");
    }
    setLoading(false);
  };
  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <Input
        label="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={errors.email && tw`border border-red-400`}
      />
      {errors.email && (
        <Text style={tw`text-xs text-red-400`}>Error in email</Text>
      )}
      <Input
        label="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={errors.password && tw`border border-red-400`}
      />
      {errors.password && (
        <Text style={tw`text-xs text-red-400`}>Error in password</Text>
      )}
      <PrimaryButton
        label="ingresar"
        style={tw`mt-4`}
        onPress={handleSubmit}
        disabled={loading}
      />
      <View style={tw`flex-row items-center mt-8`}>
        <Text style={tw`text-xs text-gray-400`}>Si no tienes una cuenta </Text>
        <Text
          style={tw`text-xs text-green-600`}
          onPress={() => navigation.navigate("Register")}
        >
          registrate aqui
        </Text>
      </View>
    </View>
  );
}

export default SignIn;
