import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
interface customButton {
  title: string;
  onPress: () => void;
}

export default function customButton({ title, onPress }: customButton) {
  return (
    <View style={styles.container}>
      {" "}
      {/* Contêiner para o botão */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {" "}
        {/* Botão que pode ser pressionado */}
        <Text style={styles.buttonText}>{title}</Text> {/* Texto do botão */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#C29200",
    width: 280,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 657,
    left: 58,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
