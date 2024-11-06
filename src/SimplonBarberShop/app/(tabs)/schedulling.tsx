import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MobileLayout from "@/components/layout/mobileLayout";
import BarberSelect from "@/components/schedulling/barberSelect";
import ServiceSelect from "@/components/schedulling/serviceSelect";
import DateTimeSelect from "@/components/schedulling/dateTimeSelect";
import CustomModal from "@/components/modals/customModal";
import BarberSelectModal from "@/components/modals/schedulling/barberSelectModal";

interface Barber {
  name: string;
  image: string;
}

const Schedulling = () => {
  const [isVisible, setVisible] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

  function handleSelectBarber(barber: Barber) {
    setSelectedBarber(barber);
    setVisible(false);
  }

  return (
    <MobileLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Agendamento</Text>
        <BarberSelect onPress={() => setVisible(true)} selectedBarber={selectedBarber} />
        <ServiceSelect />
        <DateTimeSelect />
      </View>

      <CustomModal visible={isVisible}>
        <BarberSelectModal onClose={() => setVisible(false)} onSelectBarber={handleSelectBarber} />
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
  },
});

