import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "@/components/customInput";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";
import { signIn } from "@/service/firebase";
import { router } from "expo-router";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const response = await signIn(
      email.replaceAll(" ", ""),
      password.replaceAll(" ", "")
    );

    if (response.error) {
      Alert.alert("Erro", response.error);
      return;
    }
    Alert.alert("Sucesso", "Login realizado com sucesso!");
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
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
              title="Email"
              value={email}
              placeholder="Digite seu e-mail"
              handleChangeText={(emailText: string) => setEmail(emailText)}
            />
            <CustomInput
              title="Senha"
              value={password}
              placeholder="Digite sua senha"
              handleChangeText={(passwordText: string) =>
                setPassword(passwordText)
              }
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
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
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
  },
  login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    height: 174,
    display: "flex",
    marginTop: 90,
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
