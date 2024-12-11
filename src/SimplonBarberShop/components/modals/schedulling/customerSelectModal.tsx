import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/customButton";
import firebase from "firebase/compat";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Customer } from "@/utils/types";

interface CustomerSelectModalProps {
  onClose: () => void;
  onSelectCustomer: (customer: Customer) => void;
}

export default function CustomerSelectModal({
  onClose,
  onSelectCustomer,
}: CustomerSelectModalProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [customerSelected, setCustomer] = useState<Customer | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const snapshot = await firebase
          .firestore()
          .collection("users")
          .where("tipo", "==", "cliente")
          .get();

        const data = snapshot.docs.map((doc) => ({
          uid: doc.id,
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


  function handleSelectCustomer(customer: Customer) {
    setCustomer(customer);
    setIsSelected(true);
  }

  function handleConfirm() {
    if (isSelected && customerSelected) {
      onSelectCustomer(customerSelected);
    }
    onClose();
  }

  return (
    <View style={styles.modal}>
      <View style={{ alignItems: "flex-end", width: "100%" }}>
        <TouchableOpacity onPress={onClose}>
          <MaterialIcons name="cancel" size={31} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text1}>Selecionar Cliente</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar cliente"
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={handleSearch}
      />
      <ScrollView style={styles.section2}>
        {filteredCustomers.map((customer, index) => (
          <TouchableOpacity
            style={[
              styles.card,
              customerSelected === customer &&
                isSelected && { borderWidth: 1, borderColor: "#4ECB71" },
            ]}
            key={index}
            onPress={() => handleSelectCustomer(customer)}
          >
            <View style={styles.section1}>
              <MaterialIcons name="person" size={33} color="white" />
              <Text style={styles.text2}>{customer.nome}</Text>
            </View>
            <View>
              <MaterialIcons
                name={
                  customerSelected === customer && isSelected
                    ? "check-circle"
                    : "add-circle"
                }
                size={31}
                color={
                  customerSelected === customer && isSelected
                    ? "#4ECB71"
                    : "white"
                }
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    height: 600,
    borderRadius: 8,
    alignItems: "center",
    padding: 12,
    justifyContent: "center",
  },
  section2: {
    flex: 1,
    marginBottom: 38,
    maxHeight: 530,
    paddingVertical: 10
  },
  text1: {
    fontFamily: "CircularSpotifyText-Bold",
    fontSize: 18,
    color: "white",
    marginBottom: 15,
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
    marginTop: 7
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
  image: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
  },
  searchInput: {
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    color: "#000000",
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    width: 300
  },
});
