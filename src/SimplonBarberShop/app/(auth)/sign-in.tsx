import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "@/components/customInput";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";
import { signIn, useHandleResetPassword } from "@/service/firebase";
import { router } from "expo-router";
import CustomModal from "@/components/modals/customModal";
import InformativeModal from "@/components/modals/informativeModal";
import Toast from "react-native-toast-message";
import toastConfig from "@/utils/toastConfig";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    handleResetPassword,
    isModalVisible,
    modalMessage,
    closeModal,
    modalTitle,
  } = useHandleResetPassword();

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

    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.body}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraHeight={100} 
        extraScrollHeight={100}
      >
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
            <TouchableOpacity onPress={() => handleResetPassword(email)}>
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
      </KeyboardAwareScrollView>
      <CustomModal visible={isModalVisible}>
        <InformativeModal
          title={modalTitle}
          message={modalMessage}
          onClose={closeModal}
        />
      </CustomModal>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  body: {
    flex: 1,
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
