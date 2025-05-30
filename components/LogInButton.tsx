import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const LogInButton = () => {
  return (
    <TouchableOpacity>
      <LinearGradient
        colors={["darkblue", "#C11C84"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.1 }}
        style={styles.logInButton}>
        <Text style={styles.logInButtonText}>Log In</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logInButton: {
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
  logInButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});

export default LogInButton;
