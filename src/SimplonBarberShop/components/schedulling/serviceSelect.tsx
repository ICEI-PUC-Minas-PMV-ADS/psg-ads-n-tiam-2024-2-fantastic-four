import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Service } from "@/utils/types";

interface ServiceSelectProps {
  onPress: () => void;
  selectedService: Service | null;
}
const ServiceSelect = ({ onPress, selectedService }: ServiceSelectProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.section1}>
        <MaterialIcons name="content-cut" size={33} color="white" />

        {selectedService ? (
          <Text style={styles.text2}>
            {selectedService
              ? selectedService.serviceName
              : "Escolha o Serciço"}
          </Text>
        ) : (
          <Text style={styles.text1}>Escolha o serviço</Text>
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons
          name={selectedService ? "check-circle" : "add-circle"}
          size={31}
          color={selectedService ? "#4ECB71" : "white"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default ServiceSelect;
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
