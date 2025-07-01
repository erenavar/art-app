import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setAuthenticated,
  setCode,
  setEmail,
  setFullName,
} from "@/redux/reducers/Auth";
import { doc, setDoc } from "firebase/firestore";
import db from "../../../firebase.config";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Profile: undefined;
};
type FormScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const Form = () => {
  const code = useAppSelector((state) => state.auth.code);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<FormScreenNavigationProp>();

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

  const [emailInputError, setEmailInputError] = useState<string | null>(null);
  const [fullNameInputError, setFullNameInputError] = useState<string | null>(
    null
  );
  const [passwordInputError, setPasswordInputError] = useState<string | null>(
    null
  );

  const validateData = (): boolean => {
    setEmailInputError(null);
    setFullNameInputError(null);
    setPasswordInputError(null);

    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fullNamePattern: RegExp = /^[a-zA-Z\s'-]+$/;
    let valid = true;

    if (!emailPattern.test(form.email)) {
      setEmailInputError("Invalid email address");
      valid = false;
    }
    if (!fullNamePattern.test(form.fullName) || form.fullName.length < 2) {
      setFullNameInputError("Please, check your full name.");
      valid = false;
    }
    if (form.password.length < 8) {
      setPasswordInputError("Password must be at least 8 characters.");
      valid = false;
    }
    return valid;
  };

  const signUpFunc = async () => {
    if (!validateData()) return;
    if (!isChecked) {
      alert("You must agree to the Privacy Policy.");
      return;
    }
    if (!isLoaded || !signUp) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
        unsafeMetadata: {
          fullName: form.fullName,
        },
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        const clerkError = JSON.parse(err.message)[0];
        alert(clerkError.longMessage || "An error occurred during sign up.");
        console.error("Clerk sign up error:", clerkError);
      } else {
        console.error("Unknown error on sign up component", err);
      }
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded || !signUp) return;
    try {
      const codeString = code.join("");
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: codeString,
      });

      if (
        completeSignUp.status === "complete" &&
        completeSignUp.createdSessionId
      ) {
        await setActive({ session: completeSignUp.createdSessionId });

        dispatch(setAuthenticated(true));
        dispatch(setEmail(form.email));
        dispatch(setFullName(form.fullName));

        if (completeSignUp.createdUserId) {
          await setDoc(doc(db, "users", completeSignUp.createdUserId), {
            fullName: form.fullName,
            email: form.email,
            username: "",
            profileImgUrl: "",
            authType: "email",
            creationDate: new Date(),
          });
        }
        dispatch(setCode(["", "", "", ""]));
        navigation.navigate("Profile");
      }
    } catch (err) {
      if (err instanceof Error) {
        const clerkError = JSON.parse(err.message)[0];
        alert(
          clerkError.longMessage || "Verification failed. Please try again."
        );
        console.error("Verification error:", clerkError.longMessage);
      } else {
        console.error("Unknown verification error:", err);
      }
    }
  };

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.createText}>Fonts are loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.createText}>Error loading fonts.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {pendingVerification ? (
        <View style={styles.verificationArea}>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.description}>
            Please enter the 4-digit code sent to your email address.
          </Text>
          <VerificationArea />
          <TouchableOpacity
            onPress={onPressVerify}
            style={styles.createAccountButton}>
            <LinearGradient
              colors={["#B24E9D", "#7E3BA1"]}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <Text style={styles.createText}>Verify</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <CustomTextInput
            label="Email"
            placeholder="E-mail"
            value={form.email}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, email: text }))
            }
            editable={!pendingVerification}
            inputError={!!emailInputError}
            errorMessage={emailInputError || ""}
            autoFocus={true}
          />
          <CustomTextInput
            label="Full Name"
            placeholder="Full Name"
            value={form.fullName}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, fullName: text }))
            }
            editable={!pendingVerification}
            inputError={!!fullNameInputError}
            errorMessage={fullNameInputError || ""}
          />
          <CustomTextInput
            label="Password"
            placeholder="Password - At least 8 characters"
            value={form.password}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, password: text }))
            }
            isPassword={true}
            editable={!pendingVerification}
            inputError={!!passwordInputError}
            errorMessage={passwordInputError || ""}
          />
          <View style={styles.checkBox}>
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
              <View
                style={[
                  styles.checkBoxView,
                  { backgroundColor: isChecked ? "#A466F8" : "transparent" },
                ]}>
                {isChecked && <Entypo name="check" color="white" size={20} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkBoxText}>
              I have read and agree to the terms of use and privacy policy.
            </Text>
          </View>
          <TouchableOpacity
            onPress={signUpFunc}
            style={styles.createAccountButton}>
            <LinearGradient
              colors={["#B24E9D", "#7E3BA1"]}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <Text style={styles.createText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 54,
    width: "84%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
  },
  description: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins_300Light",
  },
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  checkBoxView: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
  },
  checkBoxText: {
    marginLeft: 10,
    color: "white",
    flex: 1,
    fontFamily: "Poppins_300Light",
  },
  createAccountButton: {
    width: "100%",
    height: 60,
    marginTop: 20,
    borderRadius: 8,
    alignSelf: "center",
  },
  gradientButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  createText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  verificationArea: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Form;
