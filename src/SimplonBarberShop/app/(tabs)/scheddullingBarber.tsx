import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import MobileLayout from "@/components/layout/mobileLayout";
import firebase from "firebase/compat";
import { formatDate, formatDateToDDMMYYYY } from "@/utils/utils";
import { useAuthContext } from "../context/authContextProvider";
import { Calendar } from "react-native-calendars";
import CustomModal from "@/components/modals/customModal";
import SchedulingBarberModal from "@/components/modals/schedulling/SchedulingBarberModal";
import { ScrollView } from "react-native-gesture-handler";

const SchedulingBarber = () => {
  const { user } = useAuthContext();
  const [schedullings, setSchedullings] = useState<any[]>([]);
  const [userNames, setUserNames] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSchedullings, setSelectedSchedullings] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchSchedullings = async () => {
      const today = new Date();
      const todayFormatted = formatDate(today);
      console.log(todayFormatted);
      firebase
        .firestore()
        .collection("schedullings")
        .where("day", "==", todayFormatted)
        .where("idBarber", "==", user?.uid)
        .onSnapshot((snapshot) => {
          const agendamentos = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSchedullings(agendamentos);
        });
    };

    fetchSchedullings();
  }, [user?.uid]);

  const fetchSelectedSchedullings = async (day: string) => {
    firebase
      .firestore()
      .collection("schedullings")
      .where("day", "==", day)
      .where("idBarber", "==", user?.uid)
      .onSnapshot((snapshot) => {
        const agendamentos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSelectedSchedullings(agendamentos);
      });
  };

  // Carregar nomes dos usuários para os agendamentos
  useEffect(() => {
    const fetchUserNames = async () => {
      const userNamesMap: any = {};
      for (let scheduling of schedullings) {
        const userRef = firebase
          .firestore()
          .collection("users")
          .doc(scheduling.idUser);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          userNamesMap[scheduling.idUser] = userDoc.data()?.nome;
        }
      }
      setUserNames(userNamesMap);
    };

    if (schedullings.length > 0) {
      fetchUserNames();
    }
  }, [schedullings]);


  const handleSelectDate = (day: any) => {
    const correctedDate = new Date(day.timestamp);
    const localDate = new Date(
      correctedDate.getTime() + correctedDate.getTimezoneOffset() * 60000
    );
    const adjustedDate = localDate.toISOString().split("T")[0];

    setSelectedDate(day);
    fetchSelectedSchedullings(adjustedDate);
    setModalVisible(true);
  };
  

  const closeModal = () => {
    setModalVisible(false);
  };

  // Toggle expand/collapse for today's schedule section
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <MobileLayout>
      <ScrollView>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            marginBottom: 10,
            fontFamily: "CircularSpotifyText-Medium",
          }}
        >
          HOJE
        </Text>
        {schedullings.length > 0 ? (
          <>
            {isExpanded
              ? schedullings.map((scheduling) => (
                  <View key={scheduling.id}>
                    <View style={{ marginLeft: 15 }}>
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "CircularSpotifyText-Medium",
                        }}
                      >
                        {userNames[scheduling.idUser] || "Nome não encontrado"}
                      </Text>
                      {scheduling.services.map(
                        (service: any, index: number) => (
                          <Text
                            key={index}
                            style={{
                              color: "#a5a5a5",
                              fontFamily: "CircularSpotifyText-Book",
                            }}
                          >
                            {service.serviceName}
                          </Text>
                        )
                      )}
                      {scheduling.time.map((time: any, index: number) => (
                        <Text
                          key={index}
                          style={{
                            color: "#a5a5a5",
                            fontFamily: "CircularSpotifyText-Book",
                          }}
                        >
                          {time}
                        </Text>
                      ))}
                    </View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#6e6e6e",
                        marginVertical: 10,
                      }}
                    />
                  </View>
                ))
              : schedullings.slice(0, 2).map((scheduling) => (
                  <View key={scheduling.id}>
                    <View style={{ marginLeft: 15 }}>
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "CircularSpotifyText-Medium",
                        }}
                      >
                        {userNames[scheduling.idUser] || "Nome não encontrado"}
                      </Text>
                      {scheduling.services.map(
                        (service: any, index: number) => (
                          <Text
                            key={index}
                            style={{
                              color: "#a5a5a5",
                              fontFamily: "CircularSpotifyText-Book",
                            }}
                          >
                            {service.serviceName}
                          </Text>
                        )
                      )}
                      {scheduling.time.map((time: any, index: number) => (
                        <Text
                          key={index}
                          style={{
                            color: "#a5a5a5",
                            fontFamily: "CircularSpotifyText-Book",
                          }}
                        >
                          {time}
                        </Text>
                      ))}
                    </View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#6e6e6e",
                        marginVertical: 15,
                      }}
                    />
                  </View>
                ))}
            {schedullings.length > 2 && (
              <TouchableOpacity
                onPress={toggleExpand}
                style={styles.expandButton}
              >
                <Text
                  style={{
                    color: "#b4b4b4",
                    fontSize: 12,
                    fontFamily: "CircularSpotifyText-Medium",
                  }}
                >
                  {isExpanded ? `Fechar` : `Ver Mais (${schedullings.length - 2})`}
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text style={{ color: "white" }}>Sem agendamentos para hoje</Text>
        )}
      </ScrollView>
      <Text
        style={{
          color: "white",
          marginTop: 20,
          fontFamily: "CircularSpotifyText-Medium",
        }}
      >
        AGENDAMENTOS POR DATA
      </Text>
      <Calendar
        style={styles.calendar}
        headerStyle={styles.header}
        theme={{
          textMonthFontSize: 18,
          todayTextColor: "#d2b070",
          selectedDayBackgroundColor: "#d2b070",
          selectedDayTextColor: "black",
          arrowColor: "#d2b070",
        }}
        onDayPress={handleSelectDate}
        markedDates={
          selectedDate && {
            [selectedDate]: { selected: true },
          }
        }
      />

      <CustomModal visible={modalVisible}>
        <SchedulingBarberModal
          selectedDate={selectedDate}
          selectedSchedullings={selectedSchedullings}
          userNames={userNames}
          onClose={setModalVisible}
        />
      </CustomModal>
    </MobileLayout>
  );
};

export default SchedulingBarber;

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 8,
    marginTop: 15,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#d2b070",
  },
  expandButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#42424299",
    borderRadius: 8,
    paddingVertical: 5,
  },
});
