import React, { useState } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { ICustomTextInput } from "../types";

const CustomTextInput: React.FC<ICustomTextInput> = ({
  label,
  placeholder,
  value,
  onChangeText,
  isPassword = false,
  editable = true,
  inputError = false,
  errorMessage = "Hata!",
  autoCapitalize = "none",
  autoCorrect = false,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isFocused ? "#A463F8" : "#fff",
            backgroundColor: isFocused ? "#000" : "transparent",
            ...(isFocused && {
              shadowColor: "#A463F8",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }),
          },
          isPassword && styles.passwordInputContainer,
        ]}>
        <TextInput
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={editable}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#757575"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !isPasswordVisible}
          style={[styles.input, isPassword && { borderColor: "transparent" }]}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Entypo
              name={isPasswordVisible ? "eye-with-line" : "eye"}
              color="#fff"
              size={26}
            />
          </TouchableOpacity>
        )}
      </View>
      {inputError && <Text style={styles.inputErrorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    fontSize: 16,
    marginTop: 25,
  },
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins_300Light",
    color: "#fff",
    fontSize: 13,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  inputErrorText: {
    fontFamily: "Poppins_300Light",
    color: "red",
    fontSize: 15,
    marginTop: 5,
  },
  passwordInputContainer: {},
  eyeIconContainer: {
    paddingLeft: 10,
  },
});

export default CustomTextInput;
