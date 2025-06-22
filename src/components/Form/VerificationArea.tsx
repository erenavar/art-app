import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";

const VerificationArea = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < code.length - 1) {
      inputsRef.current[index + 1]?.focus();
    } else if (text === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View style={{ flexDirection: "row", marginBottom: 20 }}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          value={digit}
          ref={(ref) => (inputsRef.current[index] = ref)}
          style={styles.confirmationText}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

export default VerificationArea;

const styles = StyleSheet.create({
  confirmationText: {
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
