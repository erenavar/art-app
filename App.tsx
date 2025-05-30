import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import LogInButton from "./components/LogInButton";

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
        gallery
      </Text>
      <View style={styles.imagesContainer}>
        <View style={styles.topContainer}>
          <Image
            style={styles.smImage}
            source={require("./assets/images/head.jpg")}
          />
          <Image
            style={styles.smImage}
            source={require("./assets/images/bigfoot.jpg")}
          />
        </View>
        <Image
          style={styles.bgImage}
          source={require("./assets/images/3d-abstract-cyber-particles-background-design.jpg")}
        />
      </View>

      <Text style={styles.bottomText}>Become an Artist & Collector</Text>
      <LogInButton />
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screenTitle: {
    fontSize: 36,
    fontFamily: "Poppins_500Medium",
    color: "white",
  },
  boldedTitlePart: {
    fontSize: 36,
    fontFamily: "Poppins_700Bold",
  },
  topContainer: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  imagesContainer: {
    marginTop: 30,
    flexDirection: "column",
    width: "100%",
  },
  smImage: {
    width: "48%",
    height: 210,
    borderRadius: 10,
  },
  bgImage: {
    width: "96%",
    height: 210,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 15,
  },
  bottomText: {
    fontFamily: "Poppins_500Medium",
    marginTop: 25,
    fontSize: 25,
    color: "white",
  },
});
