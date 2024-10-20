import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useRef } from "react";
import { Colors } from "@/constants/Colors";
import CustomInput from "@/components/customInput";
import GoogleImg from "../../assets/images/googleImg.png";
import firebase from "../../service/firebaseConnection";
import { useRouter } from "expo-router";

const SignUp = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const windowWidth = Dimensions.get("window").width;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState("cliente");

  const handleNextStep = () => {
    if (currentStep < 1) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: windowWidth * (currentStep + 1),
          animated: true,
        });
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: windowWidth * (currentStep - 1),
          animated: true,
        });
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        console.log("Usuário registrado:", user);

        await firebase.firestore().collection("users").doc(user.uid).set({
          nome: nome,
          telefone: telefone,
          dataNascimento: dataNascimento,
          tipo: tipo,
        });

        console.log("Dados adicionais salvos no Firestore");
        router.push("/(auth)/sign-in");
      } else {
        alert("Erro ao registrar usuário: usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert("Erro ao registrar usuário: ");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 40, android: 20 })}
    >
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.backgroundScreen }}
      >
        <ScrollView
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.text}>
            <Text
              style={{
                display: "flex",
                width: 306,
                fontFamily: "CircularSpotifyText-Medium",
                color: "white",
                fontSize: 18,
              }}
            >
              {currentStep === 0
                ? "Cadastre seus dados e agende seu serviço!"
                : "Insira suas informações abaixo para finalizar seu cadastro!"}
            </Text>
          </View>
          <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={{ maxWidth: 323, flexGrow: 0 }}
          >
            <View style={{ width: windowWidth }}>
              <CustomInput
                title="Email"
                value={email}
                placeholder=""
                handleChangeText={(emailText: string) => setEmail(emailText)}
              />
              <CustomInput
                title="Senha"
                value={password}
                placeholder=""
                handleChangeText={(passwordText: string) => setPassword(passwordText)}
              />
              <CustomInput
                title="Confirme sua senha"
                value={confirmPassword}
                placeholder=""
                handleChangeText={(confirmPasswordText: string) =>
                  setConfirmPassword(confirmPasswordText)
                }
              />
            </View>
            <View style={{ width: windowWidth }}>
              <CustomInput
                title="Nome Completo"
                value={nome}
                placeholder=""
                handleChangeText={(nomeText: string) => setNome(nomeText)}
              />
              <CustomInput
                title="Telefone"
                value={telefone}
                placeholder=""
                handleChangeText={(telefoneText: string) => setTelefone(telefoneText)}
                keyboardType="numeric"
              />
              <CustomInput
                title="Data de Nascimento"
                value={dataNascimento}
                placeholder="Selecione uma data"
                handleChangeText={(dataText: any) => setDataNascimento(dataText)}
              />
            </View>
          </Animated.ScrollView>

          <View style={styles.stepperContainer}>
            <View
              style={
                currentStep === 0 ? styles.activeStep : styles.inactiveStep
              }
            />
            <View
              style={
                currentStep === 1 ? styles.activeStep : styles.inactiveStep
              }
            />
          </View>
          {currentStep === 1 && (
            <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={currentStep === 1 ? styles.buttonConcluir : styles.buttonNext}
            onPress={currentStep === 1 ? handleSignUp : handleNextStep}
          >
            <Text
              style={{
                fontFamily: "CircularSpotifyText-Bold",
                color: "#D2B070",
                textAlign: "center",
              }}
            >
              {currentStep === 0 ? "Próximo passo" : "Concluir cadastro"}
            </Text>
            {currentStep === 0 && (
              <View style={styles.center}>
                <View style={styles.line} />
              </View>
            )}
          </TouchableOpacity>

          {currentStep === 0 && (
            <>
              <View style={styles.center}>
                <View style={styles.line2} />
              </View>
              <Text
                style={{
                  fontFamily: "CircularSpotifyText-Bold",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                ou
              </Text>
              <TouchableOpacity style={styles.buttonGoogle}>
                <Image source={GoogleImg} />
                <Text
                  style={{
                    fontFamily: "CircularSpotifyText-Bold",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Continue com o Google
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default SignUp;
const styles = StyleSheet.create({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  text: {
    paddingHorizontal: 30,
    marginBottom: 20,
    marginTop: 54,
  },
  button: {},
  buttonText: {
    fontFamily: "CircularSpotifyText-Bold",
    color: "#fff",
    marginTop: 5,
    fontSize: 12,
  },
  stepperContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    gap: 14,
  },
  activeStep: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#D2B070",
  },
  inactiveStep: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#121212",
    borderColor: "#D2B070",
    borderWidth: 1,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  line: {
    borderBottomColor: "#D2B070",
    borderBottomWidth: 1,
    marginVertical: 3,
    width: 90,
  },
  line2: {
    borderBottomColor: "#D2B070",
    borderBottomWidth: 1,
    marginTop: 30,
    marginBottom: 15,
    width: 250,
  },
  buttonConcluir: {
    borderWidth: 1,
    borderColor: "#D2B070",
    paddingHorizontal: 42,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 22,
  },
  buttonNext: {
    marginTop: 22,
  },
  buttonGoogle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 30,
    borderWidth: 1,
    borderColor: "#D2B070",
    paddingVertical: 13,
    width: 280,
    borderRadius: 45,
    marginTop: 15,
  },
});
