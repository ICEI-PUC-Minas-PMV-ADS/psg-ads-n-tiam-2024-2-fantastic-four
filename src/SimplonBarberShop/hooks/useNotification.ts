import { useState } from "react";
import firebase from "../service/firebaseConnection";

interface Notification {
  id?: string;
  message: string;
  icon: string;
  status: string;
  idUser: string;
  isAction: boolean;
  date: string;
  idSchedullings?: string | null;
}

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async (idUser: string) => {
    try {
      const fetchedNotifications = await firebase
        .firestore()
        .collection("notifications")
        .where("idUser", "==", idUser)
        .get();

      const notificationsArray: Notification[] = fetchedNotifications.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      ) as Notification[];

      setNotifications(notificationsArray);
    } catch (err) {
      console.error("Erro ao buscar notificações.", err);
    }
  };

  const addNotification = async (notification: Notification) => {
    try {
      await firebase.firestore().collection("notifications").add(notification);
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
