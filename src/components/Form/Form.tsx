import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  Poppins_300Light,
  Poppins_400Regular,
  useFonts,
} from "@expo-google-fonts/poppins";
import { IFormData } from "../types";
import Entypo from "react-native-vector-icons/Entypo";
import CustomTextInput from "./CustomTextInput";
import { LinearGradient } from "expo-linear-gradient";
import VerificationArea from "./VerificationArea";

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
      <CustomTextInput
        label="Email"
        placeholder="E-mail"
        value={form.email}
        onChangeText={(text: string) =>
          setForm((prevState: IFormData) => ({ ...prevState, email: text }))
        }
        editable={!pendingVerification}
        inputError={emailInputError}
        errorMessage="Email Error"
      />
      <CustomTextInput
        label="Full Name"
        placeholder="Full Name"
        value={form.fullName}
        onChangeText={(text: string) =>
          setForm((prevState: IFormData) => ({ ...prevState, fullName: text }))
        }
        editable={!pendingVerification}
        inputError={fullNameInputError}
        errorMessage="Full Name Error"
      />
      <CustomTextInput
        label="Password"
        placeholder="Password-At least 8 characters-"
        value={form.password}
        onChangeText={(text: string) =>
          setForm((prevState: IFormData) => ({ ...prevState, password: text }))
        }
        isPassword={true}
        editable={!pendingVerification}
        inputError={passwordInputError}
        errorMessage="Password Error"
      />
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
          I have read and agree to the terms of use and privacy policy
        </Text>
      </View>

      {pendingVerification ? (
        <View style={styles.verificationArea}>
          <VerificationArea />
        </View>
      ) : (
        <TouchableOpacity onPress={() => {}} style={styles.createAccountButton}>
          <LinearGradient
            colors={["#B24E9D", "#7E3BA1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <Text style={styles.createText}>Create Account</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },
  createAccountButton: {
    width: "100%",
    height: 60,
    marginTop: 20,
    borderRadius: 8,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  createText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    margin: 10,
    fontFamily: "Poppins_400Regular",
  },
  verificationArea: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
