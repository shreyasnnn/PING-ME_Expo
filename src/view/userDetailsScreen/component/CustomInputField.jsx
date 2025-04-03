import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function CustomInputField({ inputText, setInputText, hintText }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={hintText}
        value={inputText}
        onChangeText={setInputText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', // Ensure parent takes full width
    alignItems: 'center', // Keep the input centered
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    height: 50,
    width: '90%',// Make input take 90% of the screen width
  },
});
