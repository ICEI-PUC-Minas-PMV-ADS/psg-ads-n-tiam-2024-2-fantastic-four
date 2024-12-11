import { formatDateToDDMMYYYY } from "@/utils/utils";
import firebase from "firebase/compat";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";

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
        <Text style={styles.barberName}>Barbeiro: {userNames}</Text>
        <Text style={styles.date}>
          {formatDateToDDMMYYYY(schedulling?.day)}
        </Text>
      </View>
      {schedulling?.services.map((service: any, index: number) => (
        <Text
          key={index}
          style={styles.serviceName}
        >
          {service.serviceName}
        </Text>
      ))}
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{schedulling?.time}</Text>
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
    marginTop: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  barberName: {
    fontSize: 17,
    color: "#FFFFFF",
    fontFamily: "CircularSpotifyText-Book.ttf",
  },
  date: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  serviceName: {
    color: "#FFFFFF",
    marginTop: 1,
    fontSize: 17,
    fontFamily: "CircularSpotifyText-Book",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    fontSize: 17,
    color: "#FFFFFF",
  },
  statusIndicator: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: "#32CD32",
  },
});
