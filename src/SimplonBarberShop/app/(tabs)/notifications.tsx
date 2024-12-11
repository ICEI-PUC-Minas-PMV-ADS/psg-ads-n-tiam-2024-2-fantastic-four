import React, { useEffect, useState } from "react";
import MobileLayout from "@/components/layout/mobileLayout";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import firebase from "firebase/compat";
import NotificationCard from "@/components/notification/notificationCard";
import { useAuthContext } from "../context/authContextProvider";
import useNotifications from "@/hooks/useNotification";

interface Notificacao {
  id?: string; // ID opcional para identificar a notificação
  message: string; // Mensagem da notificação
  icon: string; // Ícone associado à notificação
  status: string; // Status da notificação (ex: "ler")
  idUser: string; // ID do usuário associado à notificação
  isAction: boolean; // Indica se a notificação possui ação
  date: string; // Data da notificação no formato ISO
  idSchedullings: string;
}
export default function Notifications() {
  const [notificacoesHoje, setNotificacoesHoje] = useState<any[]>([]);
  const [notificacoesOutras, setNotificacoesOutras] = useState<any[]>([]);
  const { user } = useAuthContext();
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    setLoading(true);
    const unsubscribe = firebase
      .firestore()
      .collection("notifications")
      .where("idUser", "==", user.uid)
      .onSnapshot((snapshot) => {
        const notificacoesData: Notificacao[] = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id, // ID gerado pelo Firestore
              message: data.message || "", // Forneça valores padrão para evitar erros
              icon: data.icon || "",
              status: data.status || "",
              idUser: data.idUser || "",
              isAction: data.isAction || false,
              date: data.date || new Date().toISOString(),
              idSchedullings: data.idSchedullings || "",
            } as Notificacao;
          })
          .filter((notificacao) => notificacao.status === "ler");

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const hojeNotificacoes = notificacoesData.filter((n) => {
          const notificacaoDate = new Date(n.date);
          return notificacaoDate >= hoje;
        });

        const outrasNotificacoes = notificacoesData.filter((n) => {
          const notificacaoDate = new Date(n.date);
          return notificacaoDate < hoje;
        });

        setNotificacoesHoje(hojeNotificacoes);
        setNotificacoesOutras(outrasNotificacoes);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [user?.uid]);

  const limparTodasNotificacoes = async () => {
    if (!user?.uid) return;

    const batch = firebase.firestore().batch();

    notificacoesHoje.forEach((notificacao) => {
      const notificacaoRef = firebase
        .firestore()
        .collection("notifications")
        .doc(notificacao.id);
      batch.delete(notificacaoRef);
    });

    notificacoesOutras.forEach((notificacao) => {
      const notificacaoRef = firebase
        .firestore()
        .collection("notifications")
        .doc(notificacao.id);
      batch.delete(notificacaoRef);
    });

    try {
      await batch.commit();
      console.log("Todas as notificações foram apagadas.");
    } catch (error) {
      console.error("Erro ao apagar notificações:", error);
    }
  };

  function cancelAgen(
    idSchedulling: string,
    idNotification: string,
    dateSchedulling: String
  ) {
    if (!user?.uid) return;

    const schedullingRef = firebase
      .firestore()
      .collection("schedullings")
      .doc(idSchedulling);

    schedullingRef
      .update({
        status: "canceled",
        time: [],
      })
      .then(() => {
        addNotification({
          message: `Agendamento ${dateSchedulling} cancelado com sucesso!`,
          icon: "notifications",
          status: "ler",
          idUser: user.uid,
          isAction: false,
          date: new Date().toISOString(),
          idSchedullings: null,
        });
        eraseNotification(idNotification);
      })
      .catch((error) => {
        console.error("Erro ao cancelar agendamento:", error);
      });
  }

  async function eraseNotification(idNotification: string) {
    if (!user?.uid) return;

    try {
      const notificacaoRef = firebase
        .firestore()
        .collection("notifications")
        .doc(idNotification);

      await notificacaoRef.delete();

      console.log(`Notificação com ID ${idNotification} foi apagada.`);
    } catch (error) {
      console.error("Erro ao apagar a notificação:", error);
    }
  }

  function formatDate(dateString: string): string {
    if (!dateString) return "Data inválida";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "Data inválida";
      }

      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };

      return date.toLocaleString("pt-BR", options);
    } catch {
      return "Data inválida";
    }
  }

  if (loading) {
    return (
      <MobileLayout>
        <Text
          style={{
            marginBottom: 26,
            fontFamily: "CircularSpotifyText-Bold",
            color: "white",
            fontSize: 15,
            textAlign: "center",
          }}
        >
          Notificações
        </Text>
        <ActivityIndicator size="large" color="#AE8333" />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <View style={{flex: 2}}>
        <Text
          style={{
            fontFamily: "CircularSpotifyText-Bold",
            color: "white",
            fontSize: 15,
            textAlign: "center"
          }}
        >
          Notificações
        </Text>
        {(notificacoesHoje.length > 0 || notificacoesOutras.length > 0) && (
            <TouchableOpacity
              onPress={limparTodasNotificacoes}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Limpar Todas</Text>
            </TouchableOpacity>
        )}
      </View>

      <View style={styles.container}>
        {notificacoesHoje.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Hoje</Text>
            {notificacoesHoje.map((notificacao) => (
              <NotificationCard
                key={notificacao.id}
                mensage={notificacao.message}
                onPressCancel={() =>
                  cancelAgen(
                    notificacao.idSchedullings,
                    notificacao.id,
                    formatDate(notificacao.date)
                  )
                }
                onPressConfirm={() => eraseNotification(notificacao.id)}
                buttonStyle={styles.cardButton}
                icon={notificacao.icon}
                backgroundColor={"#fff"}
                textColor={"#000"}
                isAction={notificacao.isAction}
                notificatioData={formatDate(notificacao.date)}
              />
            ))}
          </>
        )}

        {notificacoesOutras.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Outras</Text>
            {notificacoesOutras.map((notificacao) => (
              <NotificationCard
                key={notificacao.id}
                mensage={notificacao.message}
                onPressCancel={() =>
                  cancelAgen(
                    notificacao.idSchedullings,
                    notificacao.id,
                    formatDate(notificacao.date)
                  )
                }
                onPressConfirm={() => eraseNotification(notificacao.id)}
                buttonStyle={styles.cardButton}
                icon={notificacao.icon}
                backgroundColor={"#fff"}
                textColor={"#000"}
                isAction={notificacao.isAction}
                notificatioData={formatDate(notificacao.date)}
              />
            ))}
          </>
        )}

        {notificacoesHoje.length === 0 && notificacoesOutras.length === 0 && (
          <Text style={styles.emptyText}>Sem notificações no momento.</Text>
        )}
      </View>
    </MobileLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 9,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#ffffff",
    textAlign: "left",
  },
  cardButton: {
    marginVertical: 8,
  },
  clearButton: {
    width: "100%",
    backgroundColor: "transparent",
  },
  clearButtonText: {
    fontFamily: "CircularSpotifyText-Bold",
    color: "#d12f2f",
    fontSize: 12,
    textAlign: 'right',
  },
});
