import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

export default function App() {
  const [loaded, error] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (error) {
    return <></>;
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require("./assets/images/background.jpg")}>
      <Text style={styles.screenTitle}>
        <Text style={styles.boldedTitlePart}>Virtual</Text>
        Gallery
      </Text>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  screenTitle: {
    marginTop: 40,
    fontSize: 36,
    fontFamily: "Poppins_500Medium",
    color: "white",
  },
  boldedTitlePart: {
    fontFamily: "Poppins_700Bold",
  },
});
