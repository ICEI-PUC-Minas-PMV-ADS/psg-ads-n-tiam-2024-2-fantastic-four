import React, { useEffect, useState } from "react";
import MobileLayout from "@/components/layout/mobileLayout";
import { Text, View, StyleSheet } from "react-native";
import firebase from "firebase/compat";
import NotificationCard from "@/components/notification/notificationCard";
import { useAuthContext } from "../context/authContextProvider";

export default function Notifications() {
  const [notificacoes, setNotificacoes] = useState<any[]>([]);
  const { user } = useAuthContext();
  const handleGetNotification = async () => {
    const notificacoesBuscadas = await firebase
      .firestore()
      .collection("notifications")
      .where("idUser", "==", user?.uid)
      .get();

    const notificacoesData = notificacoesBuscadas.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setNotificacoes(notificacoesData);
  };

  useEffect(() => {
    handleGetNotification();
  }, []);

  return (
    <MobileLayout>
      <View style={styles.container}>
        {notificacoes.length > 0 ? (
          notificacoes.map((notificacao) => (
            <NotificationCard
              key={notificacao.id}
              mensage={notificacao.message}
              onPress={() =>
                console.log(`Notificação ${notificacao.id} clicada`)
              }
              buttonStyle={styles.cardButton}
              icon={notificacao.icon}
              width={"90%"}
              backgroundColor={"#fff"}
              textColor={"#000"}
              isAction={false}
              notificatioData={notificacao.date}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>Sem notificações no momento.</Text>
        )}
      </View>
    </MobileLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  cardButton: {
    marginVertical: 8,
  },
});
