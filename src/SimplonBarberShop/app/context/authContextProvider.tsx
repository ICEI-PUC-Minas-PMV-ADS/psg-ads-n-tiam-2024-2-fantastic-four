import React, { createContext, useState, ReactNode, useEffect } from 'react';
import firebase from '../../service/firebaseConnection';
import { Alert } from 'react-native';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, nome: string, dataNascimento: string, telefone: string, tipo: string) => Promise<void>;
}

interface User {
  uid: string;
  nome: string;
  email: string;
  dataNascimento: string;
  telefone: string;
  tipo: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
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

      const data: User = {
        uid: uid!,
        nome: userProfile.data()?.nome,
        email: response.user?.email!,
        dataNascimento: userProfile.data()?.dataNascimento,
        telefone: userProfile.data()?.telefone,
        tipo: userProfile.data()?.tipo,
      };

      setUser(data);
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      const errorMessage = error.message || "Erro desconhecido";
      Alert.alert("Erro ao fazer login", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, nome: string, dataNascimento: string, telefone: string, tipo: string) => {
    setLoading(true);
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

      const userData: User = {
        uid: uid!,
        nome,
        email,
        dataNascimento,
        telefone,
        tipo,
      };

      setUser(userData);
    } catch (error) {
      Alert.alert('Erro no cadastro');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
