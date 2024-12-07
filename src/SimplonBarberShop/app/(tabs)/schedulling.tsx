import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import MobileLayout from "@/components/layout/mobileLayout";
import BarberSelect from "@/components/schedulling/barberSelect";
import ServiceSelect from "@/components/schedulling/serviceSelect";
import DateTimeSelect from "@/components/schedulling/dateTimeSelect";
import CustomModal from "@/components/modals/customModal";
import BarberSelectModal from "@/components/modals/schedulling/barberSelectModal";
import ServiceSelectModal from "@/components/modals/schedulling/serviceSelectModal";
import TimeSelectModal from "@/components/modals/schedulling/timeSelectModal";
import CustomButton from "@/components/customButton";
import firebase from "../../service/firebaseConnection";
import { useAuthContext } from "../context/authContextProvider";
import { router } from "expo-router";
import { useNavigation } from '@react-navigation/native';

const Schedulling = () => {
  const navigation = useNavigation(); 
  const { user } = useAuthContext();
  const [isBarberVisible, setBarberVisible] = useState(false);
  const [isServiceVisible, setServiceVisible] = useState(false);
  const [isTimeVisible, setTimeVisible] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTime, setSelectedTime] = useState<Time | null>(null);

  async function handleSubmit() {
    if (!selectedBarber || !selectedService || !selectedTime) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }
    if (user) {
      const payload = {
        day: selectedTime.date,
        time: selectedTime.time,
        idUser: user.uid,
        idBarber: selectedBarber.barberId,
        services: [selectedService],
        products: [],
        totalPrice: selectedService.price || 0,
        status: "pending",
      };

      try {
        await firebase
          .firestore()
          .collection("schedullings")
          .doc()
          .set(payload);
        Alert.alert("Sucesso", "Agendamento concluído com sucesso!");
      } catch (e) {
        Alert.alert("Erro", "Erro ao salvar agendamento");
      }
      navigation.navigate('homeTab' as never);
    }
  }

  return (
    <MobileLayout>
      <View style={styles.space}>
        <View style={styles.container}>
          <Text style={styles.title}>Agendamento</Text>
          <BarberSelect
            onPress={() => setBarberVisible(true)}
            selectedBarber={selectedBarber}
          />
          <ServiceSelect
            onPress={() => setServiceVisible(true)}
            selectedService={selectedService}
          />
          <DateTimeSelect
            onPress={() => setTimeVisible(true)}
            selectedTime={selectedTime}
          />
        </View>
        <View>
          <Text style={styles.price}>
            TOTAL: {`R$ ${selectedService?.price?.toFixed(2)}`}
          </Text>
          <CustomButton
            title={"CONCLUIR AGENDAMENTO"}
            onPress={handleSubmit}
            buttonStyle={{}}
            width={"100%"}
            backgroundColor={"#D2B070"}
            textColor={"black"}
          />
        </View>
      </View>
      <CustomModal visible={isBarberVisible}>
        <BarberSelectModal
          onClose={() => setBarberVisible(false)}
          onSelectBarber={setSelectedBarber}
        />
      </CustomModal>
      <CustomModal visible={isServiceVisible}>
        <ServiceSelectModal
          onClose={() => setServiceVisible(false)}
          onSelectService={setSelectedService}
        />
      </CustomModal>
      <CustomModal visible={isTimeVisible}>
        <TimeSelectModal
          onClose={() => setTimeVisible(false)}
          onSelectTime={setSelectedTime}
        />
      </CustomModal>
    </MobileLayout>
  );
};

export default Schedulling;

const styles = StyleSheet.create({
  title: {
    fontFamily: "CircularSpotifyText-Bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  container: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  space: {
    justifyContent: "space-between",
    height: 550,
  },
  price: {
    color: "white",
    paddingBottom: 10,
    fontWeight: 700,
    fontSize: 15,
  },
});
