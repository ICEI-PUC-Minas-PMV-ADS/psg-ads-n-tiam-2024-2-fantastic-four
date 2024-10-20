import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { Colors } from "@/constants/Colors";
import CustomInput from "@/components/customInput";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from '../../service/firebaseConnection'; // Certifique-se de ajustar o caminho conforme necessário
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../context/authContextProvider";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
/*
  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
    } catch (error) {
      let errorMessage = "Erro desconhecido. Tente novamente.";
      if (error === 'auth/user-not-found') {
        errorMessage = "Usuário não encontrado.";
      } else if (error === 'auth/wrong-password') {
        errorMessage = "Senha incorreta.";
      } else if (error === 'auth/invalid-email') {
        errorMessage = "E-mail inválido.";
      }
      Alert.alert("Erro", errorMessage);
    }
  };
*/


const { signIn } = useContext(AuthContext);

function handleLogin(){
  if(email !== '' && password !== ''){
    signIn(email.replaceAll(' ', ''), password.replaceAll(' ', ''))
  }
}

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Text
          style={{
            color: "white",
            fontFamily: "CircularSpotifyText-Medium",
            marginTop: 57,
          }}
        >
          Realize seu login
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View style={styles.logo}>
            <Image source={logo} alt="Logo" />
          </View>
          <View style={styles.login}>
            <CustomInput
              value={email}
              placeholder="Digite seu e-mail"
              onChange={(emailText) => setEmail(emailText)}
            />
            <CustomInput
              value={password}
              placeholder="Digite sua senha"
              onChange={(passwordText) => setPassword(passwordText)}
            />
          </View>
          <View>
            <TouchableOpacity onPress={handleLogin} style={styles.buttonLogin}>
              <Text
                style={{
                  fontFamily: "CircularSpotifyText-Bold",
                  fontSize: 20,
                  color: "white",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{
                  height: 35,
                  color: "#D2B070",
                  marginTop: 10,
                  fontFamily: "CircularSpotifyText-Bold",
                }}
              >
                Esqueci minha senha
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registrar}>
            <Text
              style={{
                color: "#AE8333",
                fontFamily: "CircularSpotifyText-Bold",
              }}
            >
              Não possui cadastro?{" "}
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{
                  color: "#D2B070",
                  fontFamily: "CircularSpotifyText-Bold",
                }}
              >
                REGISTRAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  body: {
    height: "100%",
    backgroundColor: "#121212",
    paddingHorizontal: 30,
  },
  login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 13,
  },
  logo: {
    height: 174,
    display: "flex",
    marginTop: 29,
    marginBottom: 0,
  },
  buttonLogin: {
    width: 236,
    height: 38,
    display: "flex",
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: "#AE8333",
    marginTop: 24,
  },
  registrar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 68,
  },
});
