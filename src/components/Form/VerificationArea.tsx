import React, { useRef } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setCode } from "@/redux/reducers/Auth";

const VerificationArea = () => {
  const code = useAppSelector((state) => state.auth.code);
  const dispatch = useAppDispatch();
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    dispatch(setCode(newCode));

    if (text && index < code.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      dispatch(setCode(newCode));
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputsRef.current[index] = ref)}
          style={styles.input}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          maxLength={1}
          keyboardType="number-pad"
          returnKeyType="next"
          autoCorrect={false}
          autoCapitalize="none"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  input: {
    width: 40,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default VerificationArea;
