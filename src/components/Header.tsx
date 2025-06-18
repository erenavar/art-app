import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Poppins_500Medium, useFonts } from "@expo-google-fonts/poppins";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const [loaded, error] = useFonts({
    Poppins_500Medium,
  });

  if (error || !loaded) {
    return <></>;
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}>
        <AntDesign name="arrowleft" color="#fff" size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.placeHolder}></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "84%",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    fontSize: 19,
  },
  iconWrapper: {
    padding: 2,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#fff",
  },
  placeHolder: {
    width: 40,
    height: 1,
  },
});
