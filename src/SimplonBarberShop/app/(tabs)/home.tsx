import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useAuthContext } from "../context/authContextProvider";
import CustomButton from "@/components/customButton";
import moreIcon from "../../assets/icons/more.png";
import backReserv from "../../assets/icons/backReserv.png";
import { useNavigation } from "@react-navigation/native";
import MobileLayout from "@/components/layout/mobileLayout";
import CardSchedulling from "@/components/cardSchedulling";
import { NoAppointment } from "@/components/noAppointmen";
import firebase from "firebase/compat";
import moment from "moment";


function convertDateToISOFormat(date: string): string {
  const [day, month, year] = date.split("/").map(Number);
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

interface Scheduling {
  id: string;
  day: string;
  time: string;
  idBarber: number;
  idUser: string;
  services: { id: string; serviceName: string }[];
}

const Home = () => {
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const uid = user?.uid
  const firstName = user?.nome?.split(" ")[0];
  const formattedFirstName = firstName
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    : "";

  const [nextSchedulling, setNextSchedulling] = useState<Scheduling|null>(null);

  useEffect(() => {
    if (!uid) return;

    const fetchAppointments = async () => {
      try {
        const snapshot = await firebase
          .firestore()
          .collection("schedullings")
          .where("idUser", "==", uid)
          .get();

        const data: Scheduling[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Scheduling, "id">),
        }));

        const now = moment();

        const upcoming = data
          .filter((item) => {
            const appointmentDate = moment(
              `${item.day} ${item.time}`,
              "YYYY-MM-DD HH:mm"
            );
            return appointmentDate.isAfter(now);
          })
          .sort((a, b) => {
            const dateA = moment(`${a.day} ${a.time}`, "YYYY-MM-DD HH:mm");
            const dateB = moment(`${b.day} ${b.time}`, "YYYY-MM-DD HH:mm");
            return dateA.diff(dateB);
          });

        setNextSchedulling(upcoming[0]);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const navigateToSchedulingTab = () => {
    navigation.navigate("schedullingTab" as never);
  };

  const navigateToHistoricTab = () => {
    if (user?.isBarber) {
      navigation.navigate("schedullingBarberTab" as never);
    } else {
      navigation.navigate("historicTab" as never);
    }
  };

  return (
    <MobileLayout>
      <Text
        style={{
          fontSize: 40,
          fontFamily: "CircularSpotifyText-Bold",
          color: "white",
        }}
      >
        Olá, {formattedFirstName}
      </Text>
        {!user?.isBarber && (<><View style={styles.textAppointment}>
        <Text style={styles.title}>Próximos agendamentos</Text>
      </View>

      <ScrollView style={{ marginTop: 20 }}>
        {nextSchedulling ? (
          <CardSchedulling schedulling={nextSchedulling} />
        ) : (
          <NoAppointment />
        )}
      </ScrollView>

      <View style={styles.separatorLine} /></>)}
      

      <View style={{ display: "flex", gap: 12 }}>
        <CustomButton
          title={"Novo agendamento"}
          onPress={navigateToSchedulingTab}
          width={310}
          backgroundColor={"#D2B070"}
          source={moreIcon}
          iconSize={24}
          textColor="#121212"
        />
        <CustomButton
          title={user?.isBarber ? "Ver agendamentos" : "Reserva Agendamento"}
          onPress={navigateToHistoricTab}
          width={310}
          backgroundColor={"#121212"}
          source={backReserv}
          border={1}
          borderColor="#D2B070"
          iconSize={19}
          textColor="#D2B070"
        />
      </View>
    </MobileLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  textAppointment: {
    marginTop: 34,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: "CircularSpotifyText-Medium.ttf",
    fontWeight: "medium",
    color: "#D2B070",
    marginBottom: 0,
  },
  separatorLine: {
    height: 2,
    backgroundColor: "#AE8333",
    marginVertical: 15,
    marginTop: 34,
    marginBottom: 34,
  },
});
