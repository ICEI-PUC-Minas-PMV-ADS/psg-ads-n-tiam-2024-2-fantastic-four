import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import firebase from "../../service/firebaseConnection";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

interface Customer {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  dataNascimento: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const snapshot = await firebase
          .firestore()
          .collection("users")
          .where("tipo", "==", "cliente")
          .get();

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Customer[];

        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text === "") {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter((customer) =>
        customer.nome.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  };

  const handleOpenModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCustomer(null);
  };

  const handlePhonePress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWhatsAppPress = (phone: string) => {
    Linking.openURL(`https://wa.me/${phone.replace(/\D/g, "")}`);
  };

  // Função para formatar o telefone no formato (xx) xxxxx-xxxx
  const formatPhoneNumber = (phone: string) => {
    const cleanedPhone = phone.replace(/\D/g, "");
    if (cleanedPhone.length === 11) {
      return `(${cleanedPhone.slice(0, 2)}) ${cleanedPhone.slice(2, 7)}-${cleanedPhone.slice(7, 11)}`;
    }
    return phone; // Retorna o número original caso não tenha 11 dígitos
  };

  const renderCustomer = ({ item }: { item: Customer }) => (
    <TouchableOpacity style={styles.customerCard} onPress={() => handleOpenModal(item)}>
      <FontAwesome name="user-circle" size={24} color="#FFFFFF" style={styles.customerIcon} />
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.nome}</Text>
        <Text style={styles.customerPhone}>{formatPhoneNumber(item.telefone)}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar cliente"
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={renderCustomer}
        style={styles.list}
      />

      <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCustomer && (
              <>
                <Text style={styles.modalTitle}>{selectedCustomer.nome}</Text>

                <TouchableOpacity
                  style={styles.modalDetail}
                  onPress={() => handlePhonePress(selectedCustomer.telefone)}
                >
                  <MaterialIcons name="phone" size={20} color="#FFFFFF" />
                  <Text style={styles.modalText}>
                    {formatPhoneNumber(selectedCustomer.telefone)}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalDetail}
                  onPress={() => handleWhatsAppPress(selectedCustomer.telefone)}
                >
                  <FontAwesome name="whatsapp" size={20} color="#25D366" />
                  <Text style={styles.modalText}>Enviar WhatsApp</Text>
                </TouchableOpacity>

                <View style={styles.modalDetail}>
                  <FontAwesome name="calendar" size={20} color="#FFFFFF" />
                  <Text style={styles.modalText}>{selectedCustomer.dataNascimento}</Text>
                </View>

                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Customers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  searchInput: {
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    color: "#000000",
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  customerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F5050",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    justifyContent: "space-between", 
  },
  customerIcon: {
    marginRight: 16,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "CircularSpotifyText-Medium.ttf",
  },
  customerPhone: {
    fontSize: 15,
    color: "#B9B9B9",
    fontFamily: "CircularSpotifyText-Medium.ttf",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  modalText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  closeButton: {
    backgroundColor: "#D2B070",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#121212",
    fontWeight: "bold",
  },
});
