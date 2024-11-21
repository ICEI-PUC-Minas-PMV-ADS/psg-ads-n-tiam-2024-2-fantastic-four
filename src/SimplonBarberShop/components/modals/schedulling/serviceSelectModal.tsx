import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/customButton";

interface BarberSelectModalProps {
  onClose: () => void;
  onSelectService: (service: Service) => void;
}

const services = [
  {
    id: 1,
    serviceName: "Corte",
    price: 50.0,
    timeSpent: 1,
  },
  {
    id: 2,
    serviceName: "Barba",
    price: 30.0,
    timeSpent: 0.3,
  },
];

export default function BarberSelectModal({
  onClose,
  onSelectService,
}: BarberSelectModalProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [serviceSelected, setService] = useState<Service | null>(null);

  function handleSelectbarber(service: Service) {
    setService(service);
    setIsSelected(true);
  }

  function handleConfirm() {
    if (isSelected && serviceSelected) {
      onSelectService(serviceSelected);
    }
    onClose();
  }

  return (
    <View style={styles.modal}>
      <View style={{ alignItems: "flex-end", width: "100%" }}>
        <TouchableOpacity onPress={onClose}>
          <MaterialIcons name="cancel" size={31} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text1}>Selecionar serviço</Text>
      <View style={styles.section2}>
        {services.map((service, index) => (
          <TouchableOpacity
            style={[
              styles.card,
              serviceSelected === service &&
                isSelected && { borderWidth: 1, borderColor: "#4ECB71" },
            ]}
            key={index}
            onPress={() => handleSelectbarber(service)}
          >
            <View style={styles.section1}>
              <MaterialIcons name="content-cut" size={33} color="white" />

              <Text style={styles.text2}>{service.serviceName}</Text>
            </View>
            <View>
              <MaterialIcons
                name={
                  serviceSelected === service && isSelected
                    ? "check-circle"
                    : "add-circle"
                }
                size={31}
                color={
                  serviceSelected === service && isSelected
                    ? "#4ECB71"
                    : "white"
                }
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <CustomButton
          title="Confirmar"
          onPress={handleConfirm}
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
    color: "#FFFBFB",
  },
  image: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
  },
});
