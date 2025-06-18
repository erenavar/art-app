import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import {
  Poppins_300Light,
  Poppins_400Regular,
  useFonts,
} from "@expo-google-fonts/poppins";
import { IFormData } from "./types";
import { useSSO } from "@clerk/clerk-expo";

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

  const [isFocusedEmail, setIsFocusedEmail] = useState<boolean>(false);
  const [isFocusedFullName, setIsFocusedFullName] = useState<boolean>(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState<boolean>(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState<Boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);

  const [emailInputError, setEmailInputError] = useState<boolean>(false);
  const [fullNameInputError, setFullNameInputError] = useState<boolean>(false);
  const [passwordInputError, setPasswordInputError] = useState<boolean>(false);

  if (!loaded) return null;
  if (error) return <Text>Font Error!</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        editable={!pendingVerification}
        value={form.email}
        onChangeText={(text: string) => {
          setForm((prevState: IFormData) => ({ ...prevState, email: text }));
        }}
        placeholder="E-mail"
        placeholderTextColor="#757575"
        onFocus={() => setIsFocusedEmail(true)}
        onBlur={() => setIsFocusedEmail(false)}
        style={[
          styles.input,
          {
            borderColor: isFocusedEmail ? "#A463F8" : "#fff",
            backgroundColor: isFocusedEmail ? "#000" : "transparent",
            ...(isFocusedEmail && {
              shadowColor: "#A463F8",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }),
          },
        ]}
      />
      {emailInputError && (
        <Text style={styles.inputErrorText}>Email Error</Text>
      )}

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        editable={!pendingVerification}
        value={form.fullName}
        onChangeText={(text: string) => {
          setForm((prevState: IFormData) => ({ ...prevState, fullName: text }));
        }}
        placeholder="Full Name"
        placeholderTextColor="#757575"
        onFocus={() => setIsFocusedFullName(true)}
        onBlur={() => setIsFocusedFullName(false)}
        style={[
          styles.input,
          {
            borderColor: isFocusedFullName ? "#A463F8" : "#fff",
            backgroundColor: isFocusedFullName ? "#000" : "transparent",
            ...(isFocusedFullName && {
              shadowColor: "#A463F8",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }),
          },
        ]}
      />
      {fullNameInputError && (
        <Text style={styles.inputErrorText}>Full Name Error</Text>
      )}
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    marginTop: 54,
    width: "84%",
  },
  label: {
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    fontSize: 16,
    marginTop: 25,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    fontFamily: "Poppins_300Light",
    color: "#fff",
    fontSize: 13,
    padding: 10,
  },
  inputErrorText: {
    fontFamily: "Poppins_300Light",
    color: "red",
    fontSize: 15,
    marginTop: 5,
  },
});
