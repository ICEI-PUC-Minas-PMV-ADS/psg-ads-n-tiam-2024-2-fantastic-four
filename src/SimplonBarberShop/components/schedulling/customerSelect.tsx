import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Customer } from "@/utils/types";
interface CustomerSelectProps {
  onPress: () => void;
  selectedCustomer: Customer | null;
}

const CustomerSelect = ({ onPress, selectedCustomer }: CustomerSelectProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.section1}>
        <MaterialIcons name="person" size={33} color="white" />
        {selectedCustomer ? (
          <Text style={styles.text2}>
            {selectedCustomer.nome}
          </Text>
        ) : (
          <Text style={styles.text1}>Escolha o cliente</Text>
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons
          name={selectedCustomer ? "check-circle" : "add-circle"}
          size={31}
          color={selectedCustomer ? "#4ECB71" : "white"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomerSelect;

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
