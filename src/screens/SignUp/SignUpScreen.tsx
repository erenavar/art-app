import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SignUpScreen</Text>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
