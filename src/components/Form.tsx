import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  Poppins_300Light,
  Poppins_400Regular,
  useFonts,
} from "@expo-google-fonts/poppins";
import { IFormData } from "./types";
import Entypo from "react-native-vector-icons/Entypo";

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
            width: "100%",
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
            width: "100%",
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
      <Text style={styles.label}>Password</Text>
      <View
        style={[
          styles.passwordInputContainer,
          {
            borderColor: isFocusedPassword ? "#A463F8" : "#fff",
            backgroundColor: isFocusedPassword ? "#000" : "transparent",
            ...(isFocusedPassword && {
              shadowColor: "#A463F8",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }),
          },
        ]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          editable={!pendingVerification}
          value={form.password}
          onChangeText={(text: string) => {
            setForm((prevState: IFormData) => ({
              ...prevState,
              password: text,
            }));
          }}
          placeholder="Password-At least 8 characters-"
          placeholderTextColor="#757575"
          onFocus={() => setIsFocusedPassword(true)}
          onBlur={() => setIsFocusedPassword(false)}
          style={[
            styles.input,

            {
              borderColor: "transparent",
              backgroundColor: isFocusedPassword ? "#000" : "transparent",
              marginTop: 0,
              ...(isFocusedPassword && {
                shadowColor: "#A463F8",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0,
                shadowRadius: 4,

                borderRightColor: "transparent",
              }),
            },
          ]}
        />
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Entypo
            name={isPasswordVisible ? "eye-with-line" : "eye"}
            color="#fff"
            size={26}
          />
        </TouchableOpacity>
      </View>
      {fullNameInputError && (
        <Text style={styles.inputErrorText}>Full Name Error</Text>
      )}
      <View style={styles.checkBox}>
        <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
          <View
            style={{
              height: 24,
              width: 24,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isChecked ? "#A466F8" : "white",
            }}>
            {isChecked && <Entypo name="check" color="white" size={20} />}
          </View>
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, color: "white" }}>
          I have read and agree terms of use and privacy policy
        </Text>
      </View>
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
    width: "84%",
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
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },
});
