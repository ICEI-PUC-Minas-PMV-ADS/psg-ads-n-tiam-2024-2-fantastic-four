import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/customButton";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
  ],
  dayNamesShort: [
    'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'
  ],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt-br';

interface TimeSelectModalProps {
  onClose: () => void;
  onSelectTime: (time: Time) => void;
}

const times = [
  {
    id: 1,
    day: "13",
    time: ["10:00"],
    status: true,
  },
  {
    id: 1,
    day: "3",
    time: "11:00",
    status: true,
  },
];

export default function TimeSelectModal({
  onClose,
  onSelectTime,
}: TimeSelectModalProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [timeSelected, setTime] = useState<Time | null>(null);

  function handleSelectbarber(time: Time) {
    setTime(time);
    setIsSelected(true);
  }

  function handleConfirm() {
    if (isSelected && timeSelected) {
      onSelectTime(timeSelected);
    }
    onClose();
  }
  const [day, setDay] = useState<DateData>();
  return (
    <View style={styles.modal}>
      {/* <View style={{ alignItems: "flex-end", width: "100%" }}>
        <TouchableOpacity onPress={onClose}>
          <MaterialIcons name="cancel" size={31} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text1}>Selecionar Barbeiro</Text>
      <View style={styles.section2}>
        {times.map((time, index) => (
          <TouchableOpacity
            style={[
              styles.card,
              timeSelected === time &&
                isSelected && { borderWidth: 1, borderColor: "#4ECB71" },
            ]}
            key={index}
            onPress={() => handleSelectbarber(time)}
          >
            <View style={styles.section1}>
            {time ? (
          <Image source={{ uri: time.image }} style={styles.image} />
        ) : (
          <MaterialIcons name="person" size={33} color="white" />
        )}
              <Text style={styles.text2}>{time.name}</Text>
            </View>
            <View>
              <MaterialIcons
                name={
                  timeSelected === time && isSelected
                    ? "check-circle"
                    : "add-circle"
                }
                size={31}
                color={
                  timeSelected === time && isSelected ? "#4ECB71" : "white"
                }
              />
            </View>
          </TouchableOpacity>
        ))}
      </View> */}
      <Calendar
        style={styles.calendar}
        headerStyle={styles.header}
        theme={{
          textMonthFontSize: 18,
          todayTextColor: "#d2b070",
          selectedDayBackgroundColor: "#d2b070",
          selectedDayTextColor: "black",
          arrowColor:"#d2b070"
        }}
        onDayPress={setDay}
        markedDates={day &&{
          [day.dateString]: {selected: true}
        }}
      />
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
  calendar: {
    borderRadius: 8,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#d2b070",
  },
});
