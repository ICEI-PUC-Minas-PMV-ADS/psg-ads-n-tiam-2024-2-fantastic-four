import { StyleSheet, Text, View } from "react-native";
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

const Schedulling = () => {
  const [isBarberVisible, setBarberVisible] = useState(false);
  const [isServiceVisible, setServiceVisible] = useState(false);
  const [isTimeVisible, setTimeVisible] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTime, setSelectedTime] = useState<Time | null>(null);

  function handleSelectBarber(barber: Barber) {
    setSelectedBarber(barber);
    setBarberVisible(false);
  }

  function handleSelectService(service: Service) {
    setSelectedService(service);
    setServiceVisible(false);
  }

  function handleSelectTime(time: Time) {
    setSelectedTime(time);
    setTimeVisible(false);
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
          <CustomButton
            title={"CONCLUIR AGENDAMENTO"}
            onPress={() => {}}
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
          onSelectBarber={handleSelectBarber}
        />
      </CustomModal>
      <CustomModal visible={isServiceVisible}>
        <ServiceSelectModal
          onClose={() => setServiceVisible(false)}
          onSelectService={handleSelectService}
        />
      </CustomModal>
      <CustomModal visible={isTimeVisible}>
        <TimeSelectModal
          onClose={() => setTimeVisible(false)}
          onSelectTime={handleSelectTime}
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
});
