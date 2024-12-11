import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
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
import firebase from "../../../service/firebaseConnection";
import { useAuthContext } from "../../../app/context/authContextProvider";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import useNotifications from "@/hooks/useNotification";
import CustomerSelect from "@/components/schedulling/customerSelect";
import CustomerSelectModal from "@/components/modals/schedulling/customerSelectModal";
import { Barber, Service, Time } from "@/utils/types";
import { ScrollView } from "react-native-gesture-handler";

interface Customer {
  uid: string;
  nome: string;
  telefone: string;
  email: string;
  dataNascimento: string;
}

interface RescheduleModalProps {
    remarcar: string
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  remarcar
}) => {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const [currentModal, setCurrentModal] = useState<
    "barber" | "customer" | "service" | "time" | null
  >(null);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(
    user?.isBarber ? user : null
  );
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTime, setSelectedTime] = useState<Time | null>(null);
  const { addNotification } = useNotifications();
  const [isBarberVisible, setBarberVisible] = useState(false);
  const [isCustomerVisible, setCustomerVisible] = useState(false);
  const [isServiceVisible, setServiceVisible] = useState(false);
  const [isTimeVisible, setTimeVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setCurrentModal(null); 
  };

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
        await firebase
          .firestore()
          .collection("schedullings")
          .doc(remarcar)
          .update(payload);
  
  
        addNotification({
          message: "Remarcação de horário.",
          icon: "notifications",
          status: "ler",
          idUser: user.uid,
          isAction: false,
          date: new Date().toISOString(),
          idSchedullings: remarcar,
        });
        closeModal()
        Alert.alert("Sucesso", "Reagendamento concluído com sucesso!");
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
    <View>
      <TouchableOpacity style={styles.openModalButton} onPress={openModal}>
        <Text style={styles.openModalButtonText}>Remarcar</Text>
      </TouchableOpacity>
      <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <MobileLayout>
              <View style={styles.space}>
                <View style={styles.container}>
                  <Text style={styles.title}>Reagendamento</Text>
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
                  <View style={styles.botoes}>
                  <CustomButton
                    title={"CONFIRMAR"}
                    onPress={handleSubmit}
                    buttonStyle={{}}
                    width={"100%"}
                    backgroundColor={"#D2B070"}
                    textColor={"black"}
                  />
                  </View>
                   <CustomButton
                title={"CANCELAR"}
                onPress={closeModal}
                width={"100%"}
                backgroundColor={"#121212"}
                border={1}
                borderColor="#D2B070"
                iconSize={19}
                textColor="#D2B070"
              />
                 
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
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RescheduleModal

const styles = StyleSheet.create({
  openModalButton: {
    backgroundColor: "#D2B070",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  openModalButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContent: {
    width: "90%", 
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: "CircularSpotifyText-Bold",
    fontSize: 20,
    color: "black",
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  price: {
    color: "#f8f8f8",
    paddingBottom: 10,
    fontWeight: "700",
    fontSize: 20,
  },
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
  margin: 15,
},
space: {
  justifyContent: "space-between",
  height: 550,
},
botoes:{
  marginBottom:12
}
});
