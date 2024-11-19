import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { formatDateToDDMMYYYY } from "@/utils/utils";

interface timeSelectProps {
  onPress: () => void;
  selectedTime: Time | null;
}
const DateTimeSelect = ({ onPress, selectedTime }: timeSelectProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.section1}>
        <MaterialIcons name="event" size={33} color="white" />
        {selectedTime ? (
          <Text style={styles.text2}>
            {selectedTime
              ? `${formatDateToDDMMYYYY(selectedTime.date)} - ${
                  selectedTime.time
                }`
              : "Escolha o horário"}
          </Text>
        ) : (
          <Text style={styles.text1}>Escolha o horário</Text>
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons
          name={selectedTime ? "check-circle" : "add-circle"}
          size={31}
          color={selectedTime ? "#4ECB71" : "white"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DateTimeSelect;

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
