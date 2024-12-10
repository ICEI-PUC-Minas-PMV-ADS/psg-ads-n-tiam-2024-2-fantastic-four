import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/customButton";
import { Barber } from "@/utils/types";

interface BarberSelectModalProps {
  onClose: () => void;
  onSelectBarber: (barber: Barber) => void;
}

const barbers: Barber[] = [
  {
    uid: "QeKedO6vcAVMwJDbt6WyGsr7jcq1",
    nome: "Fábio",
    telefone: '31993273796',
    email: "fabiodiniz@yahoo.com.br",
    dataNascimento: "25/05/1972",
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9781421520568_9781421520568_hr.jpg",
  },
  {
    uid: "Fl9b54rLMDZqo9dDMditGbdl91j1",
    nome: "Alexandre",
    telefone: '31999883988',
    email: "xandecomaciel@yahoo.com.br",
    dataNascimento: "24/01/1970",
    image:
      "https://th.bing.com/th/id/R.299a77477c4b33625bd9b5f3fca5720c?rik=EJmFrtxG%2ffwr%2bQ&pid=ImgRaw&r=0",
  },
];

export default function BarberSelectModal({
  onClose,
  onSelectBarber,
}: BarberSelectModalProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [barberSelected, setBarber] = useState<Barber | null>(null);

  function handleSelectbarber(barber: Barber) {
    setBarber(barber);
    setIsSelected(true);
  }

  function handleConfirm() {
    if (isSelected && barberSelected) {
      onSelectBarber(barberSelected);
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
      <Text style={styles.text1}>Selecionar Barbeiro</Text>
      <View style={styles.section2}>
        {barbers.map((barber, index) => (
          <TouchableOpacity
            style={[
              styles.card,
              barberSelected === barber &&
                isSelected && { borderWidth: 1, borderColor: "#4ECB71" },
            ]}
            key={index}
            onPress={() => handleSelectbarber(barber)}
          >
            <View style={styles.section1}>
              {barber ? (
                <Image source={{ uri: barber.image }} style={styles.image} />
              ) : (
                <MaterialIcons name="person" size={33} color="white" />
              )}
              <Text style={styles.text2}>{barber.nome}</Text>
            </View>
            <View>
              <MaterialIcons
                name={
                  barberSelected === barber && isSelected
                    ? "check-circle"
                    : "add-circle"
                }
                size={31}
                color={
                  barberSelected === barber && isSelected ? "#4ECB71" : "white"
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
