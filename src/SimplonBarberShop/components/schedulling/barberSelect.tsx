import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface BarberSelectProps{
  onPress: ()=>void;
}


const BarberSelect = ({onPress}: BarberSelectProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.section1}>
        <MaterialIcons name="person" size={33} color="white" />
        <Text style={styles.text1}>Escolha o barbeiro</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons name="add-circle" size={31} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default BarberSelect;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 74,
    backgroundColor: "#4f5050",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  section1: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  text1: {
    fontFamily: "CircularSpotifyText-Bold",
    color: "#ADADAD",
  },
});
