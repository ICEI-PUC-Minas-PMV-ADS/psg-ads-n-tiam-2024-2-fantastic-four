import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import MobileLayout from "@/components/layout/mobileLayout";
import firebase from "../../service/firebaseConnection";
import moment from "moment";
import "moment/locale/pt-br";
import { Ionicons } from "@expo/vector-icons"; // Para ícones
import CancelButton from "@/components/cancelButton";
import useNotifications from "@/hooks/useNotification";
import RescheduleModal from "@/components/modals/schedulling/RescheduleModal";
import { Barber } from "@/utils/types";

interface Scheduling {
  id: string;
  day: string;
  time: string;
  idBarber: number;
  idUser: string;
  services: { id: string; serviceName: string }[];
  status: string;
}

const Historic = () => {
  const [appointments, setAppointments] = useState<Scheduling[]>([]);
  const [uid, setUid] = useState<string | null>(null);
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(true);

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
  
    const unsubscribe = firebase
      .firestore()
      .collection("schedullings")
      .where("idUser", "==", uid)
      .onSnapshot(
        (snapshot) => {
          setLoading(true);
          try {
            const data: Scheduling[] = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...(doc.data() as Omit<Scheduling, "id">),
            }));
  
            const now = moment();
  
            const pending = data.filter((item) => {
              const appointmentDate = moment(
                `${item.day} ${item.time}`,
                "YYYY-MM-DD HH:mm"
              );
              return appointmentDate.isAfter(now) && item.status !== "canceled";
            });
  
            const history = data.filter((item) => {
              const appointmentDate = moment(
                `${item.day} ${item.time}`,
                "YYYY-MM-DD HH:mm"
              );
              return appointmentDate.isBefore(now) && item.status !== "canceled";
            });
  
            const canceled = data.filter((item) => item.status === "canceled");
  
            setAppointments([
              ...pending,
              ...history.sort((a, b) => {
                const dateA = moment(`${a.day} ${a.time}`, "YYYY-MM-DD HH:mm");
                const dateB = moment(`${b.day} ${b.time}`, "YYYY-MM-DD HH:mm");
                return dateB.diff(dateA);
              }),
              ...canceled,
            ]);
          } catch (error) {
            console.error("Error fetching appointments:", error);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error with Firestore snapshot listener:", error);
        }
      );
  
    return () => unsubscribe();
  }, [uid]);
  

  function cancelAgen(idSchedulling: string, dateSchedulling: string) {
    if (!uid) return;

    const schedullingRef = firebase
      .firestore()
      .collection("schedullings")
      .doc(idSchedulling);

    schedullingRef
      .update({
        status: "canceled",
      })
      .then(() => {
        addNotification({
          message: `Agendamento ${dateSchedulling} cancelado com sucesso!`,
          icon: "notifications",
          status: "ler",
          idUser: uid,
          isAction: false,
          date: new Date().toISOString(),
          idSchedullings: null,
        });
      })
      .catch((error) => {
        console.error("Erro ao cancelar agendamento:", error);
      });
  }

  function getBarberName(idBarber: string): string {
    const barbers: Barber[] = [
      {
        uid: "QeKedO6vcAVMwJDbt6WyGsr7jcq1",
        nome: "Fábio",
        telefone: "31993273796",
        email: "fabiodiniz@yahoo.com.br",
        dataNascimento: "25/05/1972",
        
      },
      {
        uid: "Fl9b54rLMDZqo9dDMditGbdl91j1",
        nome: "Alexandre",
        telefone: "31999883988",
        email: "xandecomaciel@yahoo.com.br",
        dataNascimento: "24/01/1970",
        
      },
    ];
  
    const barber = barbers.find((barber) => barber.uid === idBarber);
    return barber ? barber.nome : "Barbeiro não encontrado";
  }
  
  

  const renderServices = (services: { serviceName: string }[]) => {
    return services.map((service, index) => (
      <Text key={index} style={styles.serviceText}>
        {service.serviceName}
        {index < services.length - 1 && "  | "}
      </Text>
    ));
  };

  const renderCard = (item: Scheduling) => {
    const appointmentDate = moment(
      `${item.day} ${item.time}`,
      "YYYY-MM-DD HH:mm"
    );
    const isPending = appointmentDate.isAfter(moment());
    const isHistory = appointmentDate.isBefore(moment()) && item.status !== "canceled";
  
    return (
      <View
        key={item.id}
        style={[
          styles.card,
          item.status === "canceled"
            ? styles.CanceledBord
            : isPending
            ? styles.pendingCard
            : styles.historyCard,
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconTextContainer}>
            <Ionicons
              name="person-circle"
              size={24}
              color={
                item.status === "canceled"
                  ? "#5f5858"
                  : isPending
                  ? "#F8F8F8"
                  : "#979797"
              }
            />
            <Text
              style={
                item.status === "canceled" ? styles.textCancel : styles.text
              }
            >
              {getBarberName(item.idBarber.toString())}
            </Text>
          </View>
  
          <View style={styles.iconTextContainer}>
            <Ionicons
              name="calendar"
              size={24}
              color={
                item.status === "canceled"
                  ? "#5f5858"
                  : isPending
                  ? "#F8F8F8"
                  : "#979797"
              }
            />
            <Text
              style={
                item.status === "canceled" ? styles.textCancel : styles.text
              }
            >
              {moment(item.day).format("ddd, MMM D")}
            </Text>
          </View>
  
          <View style={styles.iconTextContainer}>
            <Ionicons
              name="time"
              size={24}
              color={
                item.status === "canceled"
                  ? "#5f5858"
                  : isPending
                  ? "#F8F8F8"
                  : "#979797"
              }
            />
            <Text
              style={
                item.status === "canceled" ? styles.textCancel : styles.text
              }
            >
              {moment(item.time, "HH:mm").format("HH:mm")}
            </Text>
          </View>
        </View>
  
        <View style={styles.separator} />
        <View style={styles.servicesRow}>
          <Text
            style={
              item.status === "canceled"
                ? styles.textCancel
                : styles.textServicoNome
            }
          >
            {renderServices(item.services)}
          </Text>
        </View>
  
        {item.status === "canceled" ? (
          <View style={styles.ButtonConfig}>
            <Text style={styles.cancelText}>Cancelado</Text>
          </View>
        ) : (
          <View style={styles.cancelButtonConfig}>
            {isHistory && (
              <RescheduleModal remarcar={item.id} />
            )}
            {!isHistory && (
              <CancelButton onPress={() => cancelAgen(item.id, item.time)} />
            )}
          </View>
        )}
      </View>
    );
  };
  
  const renderSectionTitle = (title: string) => {
    return <Text style={styles.sectionTitle}>{title}</Text>;
  };

  const renderCardsByStatus = (status: string) => {
    const filteredAppointments = appointments.filter((item) => {
      const appointmentDate = moment(
        `${item.day} ${item.time}`,
        "YYYY-MM-DD HH:mm"
      );
      if (status === "pending") {
        return appointmentDate.isAfter(moment()) && item.status !== "canceled";
      } else if (status === "history") {
        return appointmentDate.isBefore(moment()) && item.status !== "canceled";
      } else if (status === "canceled") {
        return item.status === "canceled";
      }
      return false;
    });

    if (filteredAppointments.length === 0) return null;

    return (
      <View>
        {renderSectionTitle(
          status === "pending"
            ? "Próximos"
            : status === "history"
            ? "Histórico"
            : "Cancelados"
        )}
        {filteredAppointments.map((item) => renderCard(item))}
      </View>
    );
  };

  if (loading) {
    return (
      <MobileLayout>
        <Text style={styles.sectionTitle}>Histórico de agendamentos</Text>
        <ActivityIndicator size="large" color="#AE8333" />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <Text style={styles.sectionTitle}>Histórico de agendamentos</Text>
      {renderCardsByStatus("pending")}
      {renderCardsByStatus("history")}
      {renderCardsByStatus("canceled")}
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
    marginRight: 5,
  },
  separatorLine: {
    height: 2,
    backgroundColor: "#AE8333",
    marginVertical: 15,
  },
  ButtonConfig: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonConfig: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  cancelText: {
    color: "#Ffffff",
    fontFamily: "CircularSpotifyText-Medium",
  },
  CanceledBord: {
    borderColor: "transparent",
    backgroundColor: "#3c3838e5",
    color: "#3c3838e5",
  },
  textCancel: {
    color: "#8d8282e4",
  },
  textServicoNome: {
    color: "#fff",
  },
});

export default Historic;
