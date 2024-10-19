import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

interface CustomInput {
  label?: string;
  value: string;
  placeholder: string;
}

export default function CustomInput({
  label,
  value,
  placeholder,
}: CustomInput) {
  return (
    
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
        />
      </View>
    
  );
}

const styles = StyleSheet.create({
  inputView: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: 300,
  },
  labelText: {
    color: Colors.labelTextInput,
    fontFamily: "CircularSpotifyText-Medium",
  },
  input: {
    backgroundColor: "white",
    paddingLeft: 10,
    borderRadius: 8,
    height: 45,
    fontFamily: "CircularSpotifyText-Medium",
  },
});
