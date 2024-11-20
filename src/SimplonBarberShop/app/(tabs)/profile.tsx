import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import MobileLayout from "@/components/layout/mobileLayout";
import { useAuthContext } from "../context/authContextProvider";
import firebase from "../../service/firebaseConnection";
import CustomButton from "@/components/customButton";
import { router } from "expo-router";
import { signOut, redefinirPassword } from "@/service/firebase";
import EditProfileModal from "@/components/modals/editProfileModal";

interface UserData {
  nome: string;
  dataNascimento: string;
  telefone: string;
}

const Profile = () => {
  const { user } = useAuthContext();
  const [isEditProfileModalVisible, setEditProfileModalVisible] = useState(false);

  return (
    <MobileLayout>
      <View style={styles.container}>
        {user && (
          <>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <MaterialIcons name="account-circle" size={80} color="white" />
              </View>
              <View>
                <Text style={styles.name}>{user.nome}</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Feather name="mail" size={20} color="white" />
                <Text style={styles.infoText}>{user.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Feather name="phone" size={20} color="white" />
                <Text style={styles.infoText}>{user.telefone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Feather name="calendar" size={20} color="white" />
                <Text style={styles.infoText}>{user.dataNascimento}</Text>
              </View>
            </View>
            <View style={styles.btnEdit}>
              <CustomButton
                title={"Editar"}
                onPress={() => setEditProfileModalVisible(true)}
                width={164}
                backgroundColor={"#121212"}
                border={1}
                borderColor="#D2B070"
                iconSize={19}
                textColor="#D2B070"
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText} onPress={redefinirPassword}>
                Redefinir Senha
              </Text>
              <Text style={styles.footerText} onPress={signOut}>
                Sair do Aplicativo
              </Text>
            </View>
            <EditProfileModal
              visible={isEditProfileModalVisible}
              onClose={() => setEditProfileModalVisible(false)}
              currentPhone={user.telefone}
              userId={user.uid}
              nome={user.nome}
              dataNascimento={user.dataNascimento}
            />
          </>
        )}
      </View>
    </MobileLayout>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  age: {
    color: "#A9A9A9",
    fontSize: 16,
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A89D5F",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  editButtonText: {
    color: "#fff",
    marginLeft: 5,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingVertical: 10,
    alignItems: "center",
  },
  footerText: {
    color: "#A9A9A9",
    fontSize: 16,
    marginVertical: 5,
  },
  btnEdit: {
    marginVertical: 13,
  },
});
