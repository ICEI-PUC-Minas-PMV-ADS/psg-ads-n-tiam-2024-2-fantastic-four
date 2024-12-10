import { useState } from "react";
import firebase from "../service/firebaseConnection";

interface Notification {
  id?: string;
  message: string;
  icon: string;
  status: string;
  idUser: string;
  type: string;
}

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Busca notificações do Firestore
  const fetchNotifications = async (idUser: string) => {
    try {
      const fetchedNotifications = await firebase
        .firestore()
        .collection("notifications")
        .where("idUser", "==", idUser)
        .get();

      // Mapeia os documentos para um array de objetos Notification
      const notificationsArray: Notification[] = fetchedNotifications.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];

      setNotifications(notificationsArray);
    } catch (err) {
      console.error("Erro ao buscar notificações.", err);
    }
  };

  // Adiciona uma nova notificação ao Firestore
  const addNotification = async (notification: Notification) => {
    try {
      await firebase
        .firestore()
        .collection("notifications")
        .add(notification);
    } catch (e) {
      console.error("Erro ao adicionar notificação.", e);
    }
  };

  return {
    notifications,
    fetchNotifications,
    addNotification,
  };
};

export default useNotifications;
