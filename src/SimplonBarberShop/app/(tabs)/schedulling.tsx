import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import useNotifications from "@/hooks/useNotification";
import CustomerSelect from "@/components/schedulling/customerSelect";
import CustomerSelectModal from "@/components/modals/schedulling/customerSelectModal";
import { Barber, Service, Time } from "@/utils/types";

interface Customer {
  uid: string;
  nome: string;
  telefone: string;
  email: string;
  dataNascimento: string;
}

const Schedulling = () => {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const [isBarberVisible, setBarberVisible] = useState(false);
  const [isCustomerVisible, setCustomerVisible] = useState(false);
  const [isServiceVisible, setServiceVisible] = useState(false);
  const [isTimeVisible, setTimeVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(
    user?.isBarber ? user : null
  );
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTime, setSelectedTime] = useState<Time | null>(null);
  const { addNotification } = useNotifications();
  async function handleSubmit() {
    if (!selectedBarber || !selectedService || !selectedTime) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }
    if (user) {
      let payload;
      if (user?.isBarber) {
        payload = {
          day: selectedTime.date,
          time: selectedTime.time,
          idUser: selectedCustomer?.uid,
          idBarber: user.uid,
          services: [selectedService],
          products: [],
          totalPrice: selectedService.price || 0,
          status: "pending",
        };
      } else {
        payload = {
          day: selectedTime.date,
          time: selectedTime.time,
          idUser: user.uid,
          idBarber: selectedBarber.uid,
          services: [selectedService],
          products: [],
          totalPrice: selectedService.price || 0,
          status: "pending",
        };
      }

      try {
        const agendamento = await firebase
          .firestore()
          .collection("schedullings")
          .add(payload);

        addNotification({
          message: "Agendamento teste botoes.",
          icon: "notifications",
          status: "ler",
          idUser: user.uid,
          isAction: true,
          date: new Date().toISOString(),
          idSchedullings: agendamento.id,
        });

        Alert.alert("Sucesso", "Agendamento concluído com sucesso!");
        setSelectedTime(null);
        setSelectedService(null);
        setSelectedCustomer(null);
      } catch (e) {
        Alert.alert("Erro", "Erro ao salvar agendamento");
      }

      navigation.navigate("homeTab" as never);
    }
  }

  return (
    <MobileLayout>
      <View style={styles.space}>
        <View style={styles.container}>
          <Text style={styles.title}>Agendamento</Text>
          {user?.isBarber ? (
            <CustomerSelect
              onPress={() => setCustomerVisible(true)}
              selectedCustomer={selectedCustomer}
            />
          ) : (
            <BarberSelect
              onPress={() => setBarberVisible(true)}
              selectedBarber={selectedBarber}
            />
          )}

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
          {selectedService && (
            <Text style={styles.price}>
              TOTAL: {`R$ ${selectedService?.price?.toFixed(2)}`}
            </Text>
          )}
          {(selectedBarber || selectedCustomer) &&
            selectedService &&
            selectedTime && (
              <CustomButton
                title={"CONCLUIR AGENDAMENTO"}
                onPress={handleSubmit}
                buttonStyle={{}}
                width={"100%"}
                backgroundColor={"#D2B070"}
                textColor={"black"}
              />
            )}
        </View>
      </View>
      <CustomModal visible={isBarberVisible}>
        <BarberSelectModal
          onClose={() => setBarberVisible(false)}
          onSelectBarber={setSelectedBarber}
        />
      </CustomModal>
      <CustomModal visible={isCustomerVisible}>
        <CustomerSelectModal
          onClose={() => setCustomerVisible(false)}
          onSelectCustomer={setSelectedCustomer}
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
          selectedBarber={selectedBarber?.uid}
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
