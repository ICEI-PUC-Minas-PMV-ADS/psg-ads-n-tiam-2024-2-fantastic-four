import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/customButton";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import firebase from "firebase/compat";
import { Time } from "@/utils/types";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};

LocaleConfig.defaultLocale = "pt-br";

const horarios = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

interface TimeSelectModalProps {
  onClose: () => void;
  onSelectTime: (time: Time) => void;
  selectedBarber: string | undefined;
}


export default function TimeSelectModal({
  onClose,
  onSelectTime,
  selectedBarber,
}: TimeSelectModalProps) {
  const [isSelected, setIsSelected] = useState(false);

  function handleSelectTime() {
    if (day && horarioEscolhido)
      onSelectTime({ date: day.dateString, time: horarioEscolhido });
    setIsSelected(true);
  }

  function handleConfirm() {
    handleSelectTime();
    onClose();
  }
  const [day, setDay] = useState<DateData>();
  const [horarioEscolhido, setHorarioEscolhido] = useState<string[]>([""]);

  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([
    "",
  ]);

  const handleSelectDate = async (selectedDay: DateData) => {
    setDay(selectedDay);
    const agendamentos = await firebase
      .firestore()
      .collection("schedullings")
      .where("day", "==", selectedDay.dateString)
      .get();

    const agendamentosForSelectedBarber = agendamentos.docs.filter(
      (doc) => doc.data().idBarber === selectedBarber
    );

    const horariosIndisponiveis = agendamentosForSelectedBarber.flatMap(
      (doc) => doc.data().time
    );

    const horariosDisponiveisFiltrados = horarios.filter(
      (horario) => !horariosIndisponiveis.includes(horario)
    );
    setHorariosDisponiveis(horariosDisponiveisFiltrados);
  };

  return (
    <View style={styles.modal}>
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
          day && {
            [day.dateString]: { selected: true },
          }
        }
      />
      {horariosDisponiveis.length > 1 && (
        <View style={styles.horarioList}>
          {horariosDisponiveis.map((hour: string, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => setHorarioEscolhido([hour])}
              style={[
                styles.botaoHorario,
                horarioEscolhido.includes(hour) && {
                  borderWidth: 1,
                  borderColor: "#4ECB71",
                },
              ]}
            >
              <Text style={{ color: "white" }}>{hour}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View>
        <CustomButton
          title="Confirmar"
          onPress={handleConfirm}
          width={149}
          backgroundColor="#d2b070"
          textColor="black"
          buttonStyle={{
            height: 35,
            marginTop: 10
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
    height: "auto",
    borderRadius: 8,
    alignItems: "center",
    padding: 12,
    justifyContent: "center",
    paddingVertical: 25,
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
  calendar: {
    borderRadius: 8,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#d2b070",
  },
  horarioList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    paddingVertical: 10,
  },
  botaoHorario: {
    backgroundColor: "#4F5050",
    color: "white",
    borderRadius: 5,
    paddingHorizontal: 20,
  },
});
