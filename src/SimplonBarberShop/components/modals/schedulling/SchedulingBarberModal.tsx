import { formatDate } from "@/utils/utils";
import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

type SchedulingModalProps = {
  selectedDate: string | null;
  selectedSchedullings: any[];
  userNames: any;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const formatDateToDDMMYYYY = (date: any) => {
  const correctedDate = new Date(date.year, date.month - 1, date.day); 
  const formattedDate = correctedDate.toLocaleDateString("pt-BR"); 
  return formattedDate;
};


const SchedulingBarberModal: React.FC<SchedulingModalProps> = ({
  selectedDate,
  selectedSchedullings,
  userNames,
  onClose,
}) => {
  return (
    <View style={styles.modal}>
      <Text style={styles.header}>
        AGENDAMENTOS PARA {formatDateToDDMMYYYY(selectedDate)}
      </Text>
      <ScrollView style={styles.scrollViewContent}>
        {selectedSchedullings.length > 0 ? (
          selectedSchedullings.map((scheduling) => (
            <View key={scheduling.id} style={styles.card}>
              <Text style={styles.cardTitle}>
                {userNames[scheduling.idUser] || "Nome não encontrado"}
              </Text>
              {scheduling.services.map((service: any, index: number) => (
                <Text key={index} style={styles.cardText}>
                  {service.serviceName}
                </Text>
              ))}
              {scheduling.time.map((time: any, index: number) => (
                <Text key={index} style={styles.cardText}>
                  {time}
                </Text>
              ))}
            </View>
          ))
        ) : (
          <Text style={styles.text}>Sem agendamentos para esse dia</Text>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => onClose(false)}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#323434",
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 35,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "CircularSpotifyText-Medium",
    marginBottom: 20
  },
  scrollViewContent: {
    paddingBottom: 10,
    maxHeight: 400
  },
  card: {
    backgroundColor: "#444",
    width: "100%",
    marginVertical: 5,
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  cardText: {
    color: "white",
    fontSize: 11,
    marginBottom: 2,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 11,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#d2b070",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 12,
    fontFamily: "CircularSpotifyText-Medium",
  },
});

export default SchedulingBarberModal;
