import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomTextInput from "./CustomTextInput";
import Entypo from "react-native-vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { IFormData } from "../types";

// BİLGİ: Bu bileşen sadece propları alır ve UI'ı çizer. İçinde mantık yok.
const SignUpFormView = ({
  form,
  handleFormChange,
  isChecked,
  setIsChecked,
  errors,
  signUpFunc,
}) => (
  <>
    <CustomTextInput
      label="Email"
      placeholder="E-mail"
      value={form.email}
      onChangeText={(text) => handleFormChange("email", text)}
      editable={true}
      inputError={!!errors.email}
      errorMessage={errors.email}
      autoFocus={true}
    />
    <CustomTextInput
      label="Full Name"
      placeholder="Full Name"
      value={form.fullName}
      onChangeText={(text) => handleFormChange("fullName", text)}
      editable={true}
      inputError={!!errors.fullName}
      errorMessage={errors.fullName}
    />
    <CustomTextInput
      label="Password"
      placeholder="Password - At least 8 characters"
      value={form.password}
      onChangeText={(text) => handleFormChange("password", text)}
      isPassword={true}
      editable={true}
      inputError={!!errors.password}
      errorMessage={errors.password}
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
    <TouchableOpacity onPress={signUpFunc} style={styles.createAccountButton}>
      <LinearGradient
        colors={["#B24E9D", "#7E3BA1"]}
        style={styles.gradientButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Text style={styles.createText}>Create Account</Text>
      </LinearGradient>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
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
    // fontFamily: "Poppins_300Light", // Fontları merkezi bir yerden yönetmek daha iyi olabilir
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
    // fontFamily: "Poppins_400Regular",
  },
});

export default SignUpFormView;
