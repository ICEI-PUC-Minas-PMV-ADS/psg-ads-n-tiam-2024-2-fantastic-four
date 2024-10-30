import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/customButton";
interface BarberSelectModalProps {
  onClose: () => void;
}
const barbers = [
  {
    name: "Fábio",
  },
  {
    name: "Alexandre",
  },
];
export default function BarberSelectModal({ onClose }: BarberSelectModalProps) {
  return (
    <View style={styles.modal}>
      <View style={{ alignItems: "flex-end", width: "100%" }}>
        <TouchableOpacity onPress={onClose}>
          <MaterialIcons name="cancel" size={31} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text1}>Selecionar Barbeiro</Text>
      <View style={styles.section2}>
        {barbers.map((barber) => (
          <View style={styles.card}>
            <View style={styles.section1}>
              <MaterialIcons name="person" size={33} color="white" />
              <Text style={styles.text2}>{barber.name}</Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <MaterialIcons name="add-circle" size={31} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View>
        <CustomButton
          title="Confirmar"
          onPress={() => {}}
          width={149}
          backgroundColor="#d2b070"
          textColor="black"
          buttonStyle={{
            height: 35,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#323434",
    width: "100%",
    height: 400,
    borderRadius: 8,
    alignItems: "center",
    padding: 12,
    justifyContent: "center",
  },
  section2: {
    gap: 21,
    marginBottom: 38,
  },
  text1: {
    fontFamily: "CircularSpotifyText-Bold",
    fontSize: 18,
    color: "white",
    marginBottom: 38,
  },
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
  text2: {
    fontFamily: "CircularSpotifyText-Bold",
    color: "#ADADAD",
  },
});
