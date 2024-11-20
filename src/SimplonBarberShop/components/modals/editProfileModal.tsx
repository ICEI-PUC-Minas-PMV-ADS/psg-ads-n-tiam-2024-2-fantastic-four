import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import firebase from "../../service/firebaseConnection";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  currentPhone: string;
  userId: string;
  nome: string;
  dataNascimento: string; 
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  currentPhone,
  userId,
  nome,
  dataNascimento,
}) => {
  const [newPhone, setNewPhone] = useState(currentPhone);
  const [loading, setLoading] = useState(false);

  const updateDados = async () => {
    if (!newPhone || newPhone === currentPhone) {
      alert("Informe um novo número de telefone diferente do atual.");
      return;
    }

    if (newPhone.replace(/\D/g, "").length < 11) {
      alert("O número de telefone deve ter no mínimo 11 dígitos.");
      return;
    }

    setLoading(true);

    try {
      await firebase.firestore().collection("users").doc(userId).update({
        telefone: newPhone,
      });
      alert("Número de telefone atualizado com sucesso!");
      onClose();
    } catch (error) {
      alert("Erro ao atualizar o telefone. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Perfil</Text>
          
          <View style={styles.readOnlyField}>
            <Text style={styles.fieldLabel}>Nome:</Text>
            <Text style={styles.fieldValue}>{nome}</Text>
          </View>

          <View style={styles.readOnlyField}>
            <Text style={styles.fieldLabel}>Data de Nascimento:</Text>
            <Text style={styles.fieldValue}>{dataNascimento}</Text>
          </View>

          <View style={styles.inputField}>
            <Text style={styles.fieldLabel}>Telefone:</Text>
            <TextInput
              style={styles.input}
              value={newPhone}
              onChangeText={setNewPhone}
              keyboardType="phone-pad"
              placeholder="Novo telefone"
              placeholderTextColor="#A9A9A9"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={updateDados}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Salvando..." : "Salvar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#121212",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    color: "#D2B070",
    fontWeight: "bold",
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    color: "#D2B070",
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 15,
  },
  inputField: {
    width: "100%",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#1f1f1f",
    color: "#fff",
    borderRadius: 5,
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#555",
  },
  saveButton: {
    backgroundColor: "#D2B070",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  readOnlyField: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#333", 
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#555", 
  },
});
