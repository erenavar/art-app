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
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isFocused ? "#A463F8" : "#fff",
            backgroundColor: isFocused ? "#000" : "transparent",
          },
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
          style={styles.input}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Entypo
              name={isPasswordVisible ? "eye-with-line" : "eye"}
              color="#fff"
              size={20}
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
    color: "#fff",
    fontSize: 13,
    paddingVertical: 10,
  },
  inputErrorText: {
    color: "red",
    fontSize: 15,
    marginTop: 5,
  },
  eyeIconContainer: {
    paddingLeft: 10,
  },
});

export default React.memo(CustomTextInput);
