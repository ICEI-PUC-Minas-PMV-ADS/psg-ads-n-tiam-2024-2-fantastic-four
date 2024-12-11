import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Barber } from "@/utils/types";
interface BarberSelectProps {
  onPress: () => void;
  selectedBarber: Barber | null;
}

const BarberSelect = ({ onPress, selectedBarber }: BarberSelectProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.section1}>
        {selectedBarber ? (
          <Image source={{ uri: selectedBarber.image }} style={styles.image} />
        ) : (
          <MaterialIcons name="person" size={33} color="white" />
        )}
        {selectedBarber ? (
          <Text style={styles.text2}>
            {selectedBarber ? selectedBarber.nome : "Escolha o barbeiro"}
          </Text>
        ) : (
          <Text style={styles.text1}>Escolha o barbeiro</Text>
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons
          name={selectedBarber ? "check-circle" : "add-circle"}
          size={31}
          color={selectedBarber ? "#4ECB71" : "white"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
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
  image: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
  },
  text2: {
    fontFamily: "CircularSpotifyText-Bold",
    color: "#FFFBFB",
  },
});
