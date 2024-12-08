import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import firebase from "../../service/firebaseConnection";
import { getUserProfile } from "../../service/firebase";
import { Alert } from "react-native";
interface AuthContextData {
  signed: boolean;
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserProfile {
  uid: string;
  nome: string;
  email: string;
  dataNascimento: string;
  telefone: string;
  isBarber: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const getCurrentUser = async (currentUser: firebase.User) => {
    const uid = currentUser.uid;
    try {
      const userProfile = await getUserProfile(uid);
      if (userProfile) {
        return {
          uid,
          nome: userProfile?.nome || "",
          email: currentUser.email || "",
          dataNascimento: userProfile?.dataNascimento || "",
          telefone: userProfile?.telefone || "",
          isBarber: userProfile?.isBarber || false,
        };
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar perfil do usuário:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (currentUser) => {
        setIsLoading(true);

        if (currentUser) {
          try {
            const userProfile = await getCurrentUser(currentUser);
            if (userProfile) {
              setIsLoggedIn(true);
              setUser(userProfile);
            } else {
              setIsLoggedIn(false);
              setUser(null);
            }
          } catch (error) {
            console.error("Erro ao obter perfil do usuário:", error);
            setIsLoggedIn(false);
            setUser(null);
          } finally {
            setIsLoading(false);
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        setUser,
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
