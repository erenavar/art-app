import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Poppins_300Light,
  Poppins_400Regular,
  useFonts,
} from "@expo-google-fonts/poppins";
import { IFormData } from "./types";

const Form = () => {
  const [loaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
  });

  const [form, setForm] = useState<IFormData>({
    email: "",
    fullName: "",
    password: "",
  });

  if (!loaded) return null;
  if (error) return <Text>Font Error!</Text>;

  return (
    <View>
      <Text>Form</Text>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({});
