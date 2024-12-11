import { Alert } from "react-native";
import firebase from "./firebaseConnection";
import { useState } from "react";
import "firebase/auth";
import Toast from "react-native-toast-message";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const uid = response.user?.uid;

    if (!uid) {
      throw new Error("UID não encontrado");
    }

    const userProfile = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get();

    if (!userProfile.exists) {
      throw new Error("Usuário não encontrado no Firestore");
    }

    return { success: true };
  } catch (error: any) {
    console.log(error);

    if (error.code) {
      switch (error.code) {
        case "auth/user-not-found":
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Usuário não encontrado.",
          });
          break;
        case "auth/wrong-password":
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Senha incorreta.",
          });
          break;
        case "auth/invalid-email":
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "E-mail inválido.",
          });
          break;
        case "auth/user-disabled":
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Usuário desativado.",
          });
          break;
        case "auth/invalid-credential":
          Toast.show({
            type: "error",
            text1: "Credenciais inválidas!",
            text2: "Verifique as informações inseridas.",
          });
          break;
        default:
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Ocorreu um erro desconhecido. Tente novamente mais tarde.",
          });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: error.message || "Ocorreu um erro desconhecido. Tente novamente mais tarde.",
      });
    }

    return { success: false, error: error.message };
  }
};


export const signUp = async (
  email: string,
  password: string,
  nome: string,
  dataNascimento: string,
  telefone: string,
  tipo: string
) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const uid = response.user?.uid;
    await firebase.firestore().collection("users").doc(uid).set({
      nome,
      dataNascimento,
      telefone,
      email,
      tipo,
      created_at: new Date(),
    });
    alert("Cadastro realizado com sucesso!");
  } catch (error: any) {
    switch (error.code) {
      case "auth/email-already-in-use":
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Este e-mail já está em uso.",
        });
        break;
      case "auth/invalid-email":
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "E-mail inválido.",
        });
        break;
      case "auth/operation-not-allowed":
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Operação não permitida.",
        });
        break;
      case "auth/weak-password":
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "A senha é muito fraca.",
        });
        break;
      default:
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Ocorreu um erro desconhecido. Tente novamente mais tarde.",
        });
    }
  }
};

export const useHandleResetPassword = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");

  const handleResetPassword = async (email: string) => {
    if (email === "") {
      setModalMessage(
        "Por favor, insira seu e-mail antes de tentar redefinir a senha."
      );
      setModalTitle("Redefinição de senha");
      setIsModalVisible(true);
      return;
    }

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setModalMessage("E-mail para redefinição de senha enviado com sucesso.");
      setModalTitle("Redefinição de senha");
    } catch (error: any) {
      console.error("Erro ao redefinir senha:", error);
      if (error.code === "auth/too-many-requests") {
        setModalTitle("Redefinição de senha");
        setModalMessage(
          "Muitas tentativas de redefinição de senha. Por favor, tente novamente mais tarde."
        );
      } else if (error.code === "auth/user-not-found") {
        setModalTitle("Redefinição de senha");
        setModalMessage("E-mail não encontrado.");
      } else if (error.code === "auth/invalid-email") {
        setModalTitle("Redefinição de senha");
        setModalMessage("Formato de e-mail inválido.");
      } else {
        setModalTitle("Redefinição de senha");
        setModalMessage(
          "Ocorreu um erro ao tentar redefinir a senha. Por favor, tente novamente."
        );
      }
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return {
    handleResetPassword,
    isModalVisible,
    modalTitle,
    modalMessage,
    closeModal,
  };
};

export const getUserProfile = async (uid: string) => {
  try {
    const userProfile = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get();
    if (userProfile.exists) {
      return userProfile.data();
    } else {
      throw new Error("Usuário não encontrado no Firestore");
    }
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    throw error;
  }
};

export const signOut = async () => {
  await firebase.auth().signOut();
};

export const redefinirPassword = async (): Promise<boolean> => {
  const auth = firebase.auth();
  const user = auth.currentUser;

  if (!user) {
    Alert.alert("Erro", "Usuário não autenticado.");
    return false;
  }

  const password = prompt(
    "Digite uma nova senha!\n\nOBSERVAÇÃO:\n\n" +
      "- Senha deve conter no mínimo 10 caracteres\n" +
      "- Senha deve conter pelo menos um caractere especial: @$!%*?&\n" +
      "- Senha deve conter pelo menos uma letra maiúscula\n" +
      "- Senha deve conter pelo menos uma letra minúscula\n" +
      "- Senha deve conter pelo menos um número"
  );

  if (!password) return false;

  const newPassword = password.replaceAll(" ", "");

  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[@$!%*?&]/.test(newPassword);
  const isMinLength = newPassword.length >= 10;

  if (!hasUppercase) {
    Alert.alert("Erro", "Senha deve conter pelo menos uma letra maiúscula.");
    return false;
  }
  if (!hasLowercase) {
    Alert.alert("Erro", "Senha deve conter pelo menos uma letra minúscula.");
    return false;
  }
  if (!hasNumber) {
    Alert.alert("Erro", "Senha deve conter pelo menos um número.");
    return false;
  }
  if (!hasSpecialChar) {
    Alert.alert(
      "Erro",
      "Senha deve conter pelo menos um caractere especial: @$!%*?&"
    );
    return false;
  }
  if (!isMinLength) {
    Alert.alert("Erro", "Senha deve conter no mínimo 10 caracteres.");
    return false;
  }

  try {
    await user.updatePassword(newPassword);
    Alert.alert("Sucesso", "Senha redefinida com sucesso!");
    return true;
  } catch (error: any) {
    console.error("Erro ao redefinir senha:", error);
    Alert.alert(
      "Erro",
      "Ocorreu um erro ao redefinir a senha. Tente novamente."
    );
    return false;
  }
};
