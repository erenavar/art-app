import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Poppins_300Light,
  Poppins_400Regular,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useSignUpForm } from "../../hooks/useSignUpForm";
import SignUpFormView from "./SignUpFormView";
import VerificationView from "./VerificationView";

const Form = () => {
  const [loaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
  });

  const {
    form,
    handleFormChange,
    isChecked,
    setIsChecked,
    pendingVerification,
    errors,
    signUpFunc,
    onPressVerify,
  } = useSignUpForm();

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

  // BİLGİ: Arayüz artık sadece hangi parçayı göstereceğine karar veriyor.
  return (
    <View style={styles.container}>
      {pendingVerification ? (
        <VerificationView onPressVerify={onPressVerify} />
      ) : (
        <SignUpFormView
          form={form}
          handleFormChange={handleFormChange}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          errors={errors}
          signUpFunc={signUpFunc}
        />
      )}
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    width: "84%",
    alignItems: "center",
    justifyContent: "center",
  },
  createText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
});
