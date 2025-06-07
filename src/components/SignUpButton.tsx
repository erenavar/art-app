import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";

const SignUpButton = ({ testId }: { testId: string }) => {
  type StackNavigation = StackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<StackNavigation>();

  return (
    <TouchableOpacity
      testID={testId}
      onPress={() => {
        navigation.navigate("SignUp");
      }}>
      <LinearGradient
        colors={["#C11C84", "darkblue"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signUpButton: {
    width: 200,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});

export default SignUpButton;
