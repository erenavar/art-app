import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import VerificationArea from "./VerificationArea";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "@/redux/hooks";

const VerificationView = ({ onPressVerify }) => {
  const code = useAppSelector((state) => state.auth.code);

  return (
    <View style={styles.verificationArea}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.description}>
        Please enter the 4-digit code sent to your email address.
      </Text>
      <VerificationArea />
      <TouchableOpacity
        onPress={() => onPressVerify(code.join(""))}
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
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    // fontFamily: "Poppins_400Regular",
  },
  description: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
    // fontFamily: "Poppins_300Light",
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
  verificationArea: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VerificationView;
