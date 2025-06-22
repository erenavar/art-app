import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import { useSignUp } from "@clerk/clerk-expo";

const Form = () => {
  const [loaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
  });
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState<IFormData>({
    email: "",
    fullName: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [emailInputError, setEmailInputError] = useState<string>("");
  const [fullNameInputError, setFullNameInputError] = useState<string>("");
  const [passwordInputError, setPasswordInputError] = useState<string>("");

  function validateData() {
    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    const fullNamePattern: RegExp = /^[a-zA-Z\s]+$/;
    let valid = true;
    if (!emailPattern.test(form.email)) {
      setEmailInputError("Invalid email address");
      valid = false;
    }
    if (!fullNamePattern.test(form.fullName) || form.fullName.length < 2) {
      setFullNameInputError(
        "Please, Control Your Fullname Area.It must contain only letters..."
      );
      valid = false;
    }
    if (form.password.length < 8) {
      setPasswordInputError(
        "Password must be at least 8 characters. Please review it."
      );
      valid = false;
    }
    return valid;
  }

  const signUpFunc = async () => {
    if (!isChecked) {
      alert("You must agree to Privacy Policy ");
      return;
    }
    if (!validateData) {
      return;
    }
    if (!loaded) {
      return;
    }

    try {
      await signUp!.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (error: unknown) {
      console.log("error on form component", error);
    }
  };

  const onPressVerify = async () => {
    const completeSignUp = await signUp?.attemptEmailAddressVerification({
      code: code.join(""),
    });
  };

  if (!loaded || error) return <></>;

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
