import Form from "@/src/components/Form/Form";
import Header from "@/src/components/Header";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Form />
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b1b1b",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
});
