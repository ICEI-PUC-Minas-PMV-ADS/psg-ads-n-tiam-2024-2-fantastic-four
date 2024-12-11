import { formatDateToDDMMYYYY } from "@/utils/utils";
import firebase from "firebase/compat";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type CardSchedullingProps = {
  schedulling: any;
};

const CardSchedulling: React.FC<CardSchedullingProps> = ({ schedulling }) => {
  const [userNames, setUserNames] = useState<string>("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (schedulling && schedulling.idBarber) {
          const usersRef = firebase
            .firestore()
            .collection("users")
            .doc(schedulling.idBarber);

          const userDoc = await usersRef.get();
          const userName = userDoc.data()?.nome || "Nome não encontrado";
          setUserNames(userName);
        }
      } catch (error) {
        return;
      }
    };

    fetchUserName();
  }, [schedulling]);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.barberName}>
          <Text style={{ fontFamily: "CircularSpotifyText-Medium" }}>Barbeiro | </Text> 
          {userNames.split(" ")[0]}
        </Text>
        <Text style={styles.date}>{formatDateToDDMMYYYY(schedulling?.day)}</Text>

      </View>
      {schedulling?.services.map((service: any, index: number) => (
        <Text key={index} style={styles.serviceName}>
          {service.serviceName}
        </Text>
      ))}
      <View style={styles.timeContainer}>
        <Text style={styles.time}>Horário: {schedulling?.time}</Text>
        <View style={styles.statusIndicator} />
      </View>
    </View>
  );
};

export default CardSchedulling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  cardContainer: {
    backgroundColor: "#3A3A3A",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16, // Espaçamento entre cards
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8, // Espaçamento abaixo do cabeçalho
  },
  barberName: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "CircularSpotifyText-Book",
  },
  date: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "CircularSpotifyText-Medium",
  },
  serviceName: {
    color: "#FFFFFF",
    marginTop: 4, // Espaçamento entre os serviços
    fontSize: 14,
    fontFamily: "CircularSpotifyText-Book",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12, // Espaçamento acima do horário
  },
  time: {
    fontSize: 16, // Aumentei o tamanho da fonte
    color: "#D2B070", // Destaque na cor
    fontFamily: "CircularSpotifyText-Medium",
  },
  statusIndicator: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: "#32CD32", // Indicador de status
  },
});
