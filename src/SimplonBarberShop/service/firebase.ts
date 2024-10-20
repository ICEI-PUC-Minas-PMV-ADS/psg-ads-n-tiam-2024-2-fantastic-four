import { Alert } from 'react-native';
import firebase from './firebaseConnection';
import { useState } from 'react';
import "firebase/auth";

export const signIn = async (email: string, password: string) => {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      const uid = response.user?.uid;

      if (!uid) {
        throw new Error("UID não encontrado");
      }

      const userProfile = await firebase.firestore().collection('users').doc(uid).get();

      if (!userProfile.exists) {
        throw new Error("Usuário não encontrado no Firestore");
      }
      return true;

    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('Usuário não encontrado.');
          break;
        case 'auth/wrong-password':
          alert('Senha incorreta.');
          break;
        case 'auth/invalid-email':
          alert('E-mail inválido.');
          break;
        case 'auth/user-disabled':
          alert('Usuário desativado.');
          break;
        default:
          alert('Ocorreu um erro desconhecido. Tente novamente mais tarde.');
      }
      return error;
    }
  };

  export const signUp = async (email: string, password: string, nome: string, dataNascimento: string, telefone: string, tipo: string) => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = response.user?.uid;
      await firebase.firestore().collection('users').doc(uid).set({
        nome,
        dataNascimento,
        telefone,
        email,
        tipo,
        created_at: new Date(),
      });
      alert('Cadastro realizado com sucesso!');

    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('Este e-mail já está em uso.');
          break;
        case 'auth/invalid-email':
          alert('E-mail inválido.');
          break;
        case 'auth/operation-not-allowed':
          alert('Operação não permitida.');
          break;
        case 'auth/weak-password':
          alert('A senha é muito fraca.');
          break;
        default:
          alert('Ocorreu um erro desconhecido. Tente novamente mais tarde.');
      }
    }

  };


  export const useHandleResetPassword = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [modalTitle, setModalTitle] = useState<string>("");
  
    const handleResetPassword = async (email: string) => {
      if (email === "") {
        setModalMessage("Por favor, insira seu e-mail antes de tentar redefinir a senha.");
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
          setModalMessage("Muitas tentativas de redefinição de senha. Por favor, tente novamente mais tarde.");
        } else if (error.code === "auth/user-not-found") {
          setModalTitle("Redefinição de senha");
          setModalMessage("E-mail não encontrado.");
        } else if (error.code === "auth/invalid-email") {
          setModalTitle("Redefinição de senha");
          setModalMessage("Formato de e-mail inválido.");
        } else {
          setModalTitle("Redefinição de senha");
          setModalMessage("Ocorreu um erro ao tentar redefinir a senha. Por favor, tente novamente.");
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
      closeModal
    };
  };

export const getUserProfile = async (uid: string) => {
  try {
    const userProfile = await firebase.firestore().collection('users').doc(uid).get();
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