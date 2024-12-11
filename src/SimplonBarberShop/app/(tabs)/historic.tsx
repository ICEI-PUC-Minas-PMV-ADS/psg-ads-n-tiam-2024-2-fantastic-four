import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import MobileLayout from "@/components/layout/mobileLayout";
import firebase from "../../service/firebaseConnection";
import moment from "moment";
import "moment/locale/pt-br";
import { Ionicons } from "@expo/vector-icons";

interface Scheduling {
  id: string;
  day: string;
  time: string;
  idBarber: number;
  idUser: string;
  services: { id: string; serviceName: string }[];
}

const Historic = () => {
  const [appointments, setAppointments] = useState<Scheduling[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Scheduling[]>(
    []
  );
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user ID (uid)
  useEffect(() => {
    const fetchUser = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setUid(user.uid);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!uid) return;

    const fetchAppointments = async () => {
      setLoading(true); // Ativar o loading
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

        const history = data
          .filter((item) => {
            const appointmentDate = moment(
              `${item.day} ${item.time}`,
              "YYYY-MM-DD HH:mm"
            );
            return appointmentDate.isBefore(now);
          })
          .sort((a, b) => {
            const dateA = moment(`${a.day} ${a.time}`, "YYYY-MM-DD HH:mm");
            const dateB = moment(`${b.day} ${b.time}`, "YYYY-MM-DD HH:mm");
            return dateB.diff(dateA); 
          });

        setUpcomingAppointments(upcoming);
        setAppointments(history);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false); // Desativar o loading
      }
    };

    fetchAppointments();
  }, [uid]);

  const getBarberName = (idBarber: number) => {
    switch (idBarber) {
      case 1:
        return "Fábio";
      case 2:
        return "Alexandre";
      default:
        return "Barbeiro";
    }
  };

  const renderServices = (services: { serviceName: string }[]) => {
    return services.map((service, index) => (
      <Text key={index} style={styles.serviceText}>
        {service.serviceName}
        {index < services.length - 1 && "  | "}
      </Text>
    ));
  };

  const renderCard = (item: Scheduling, isUpcoming: boolean) => {
    const appointmentDate = moment(
      `${item.day} ${item.time}`,
      "YYYY-MM-DD HH:mm"
    );
    const isPending = appointmentDate.isAfter(moment());

    return (
      <View
        key={item.id} 
        style={[
          styles.card,
          isUpcoming && isPending ? styles.pendingCard : styles.historyCard,
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconTextContainer}>
            <Ionicons
              name="person-circle"
              size={24}
              color={isUpcoming && isPending ? "#F8F8F8" : "#979797"}
            />
            <Text style={styles.text}>{getBarberName(item.idBarber)}</Text>
          </View>

          <View style={styles.iconTextContainer}>
            <Ionicons
              name="calendar"
              size={24}
              color={isUpcoming && isPending ? "#F8F8F8" : "#979797"}
            />
            <Text style={styles.text}>
              {moment(item.day).format("ddd, MMM D")}
            </Text>
          </View>

          <View style={styles.iconTextContainer}>
            <Ionicons
              name="time"
              size={24}
              color={isUpcoming && isPending ? "#F8F8F8" : "#979797"}
            />
            <Text style={styles.text}>
              {moment(item.time, "HH:mm").format("HH:mm")}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.servicesRow}>{renderServices(item.services)}</View>
      </View>
    );
  };

  if (loading) {
    return (
      <MobileLayout>
         <Text
        style={{
          marginBottom: 26,
          fontFamily: "CircularSpotifyText-Bold",
          color: "white",
          fontSize: 15,
          textAlign: 'center'
        }}
      >
        Histórico de agendamentos
      </Text>
        <ActivityIndicator size="large" color="#AE8333" />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <Text
        style={{
          marginBottom: 26,
          fontFamily: "CircularSpotifyText-Bold",
          color: "white",
          fontSize: 15,
        }}
      >
        Histórico de agendamentos
      </Text>
      {upcomingAppointments.map((item) =>
        renderCard(item, true)
      )}
      <View style={styles.separatorLine} />
      {appointments.map((item) => renderCard(item, false))}
    </MobileLayout>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 16,
    color: "white",
  },
  card: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#4F5050",
  },
  pendingCard: {
    borderColor: "#4CAF50",
    borderWidth: 2,
  },
  historyCard: {
    borderColor: "transparent",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  iconTextContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: "#F8F8F8",
    marginTop: 5,
    fontWeight: "bold",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 10,
  },
  servicesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  serviceText: {
    fontSize: 14,
    color: "#F8F8F8",
    marginRight: 5,
  },
  separatorLine: {
    height: 2,
    backgroundColor: "#AE8333",
    marginVertical: 15,
  },
});

export default Historic;
