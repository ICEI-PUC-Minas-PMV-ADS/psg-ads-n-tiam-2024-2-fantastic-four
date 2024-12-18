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
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import { Colors } from "@/constants/Colors";
import CustomInput from "@/components/customInput";
import GoogleImg from "../../assets/images/googleImg.png";
import firebase from "../../service/firebaseConnection";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const SignUp = () => {
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
  const [isBarber, setIsBarber] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "As senhas não coincidem!",
      });
      return;
    }

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !nome ||
      !telefone ||
      !dataNascimento
    ) {
      Toast.show({
        type: "error",
        text1: "Existem campos vazios!",
        text2: "Preencha todos os campos.",
      });
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
          isBarber: isBarber,
        });

        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Cadastro realizado com sucesso.",
        });

        router.push("/(auth)/sign-in");
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao registrar usuário",
          text2: "usuário não encontrado",
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao registrar usuário",
        text2: String(error.FirebaseError.Firebase),
      });
    }
    setLoading(false);
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
            <View style={{ marginBottom: 20 }}>
              <TouchableOpacity onPress={() => router.push("/sign-in")}>
                <Text
                  style={{
                    fontFamily: "CircularSpotifyText-Medium",
                    color: Colors.goldColor,
                    fontSize: 12,
                  }}
                >
                  Voltar para o login
                </Text>
              </TouchableOpacity>
            </View>
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
                handleChangeText={(passwordText: string) =>
                  setPassword(passwordText)
                }
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
                handleChangeText={(telefoneText: string) =>
                  setTelefone(telefoneText)
                }
                keyboardType="numeric"
              />
              <CustomInput
                title="Data de Nascimento"
                value={dataNascimento}
                placeholder="Selecione uma data"
                handleChangeText={(dataText: any) =>
                  setDataNascimento(dataText)
                }
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
            <TouchableOpacity
              style={styles.button}
              onPress={handlePreviousStep}
            >
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={
              currentStep === 1 ? styles.buttonConcluir : styles.buttonNext
            }
            onPress={currentStep === 1 ? handleSignUp : handleNextStep}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text
                style={{
                  fontFamily: "CircularSpotifyText-Bold",
                  color: "#D2B070",
                  textAlign: "center",
                }}
              >
                {currentStep === 0 ? "Próximo passo" : "Concluir cadastro"}
              </Text>
            )}
            {currentStep === 0 && (
              <View style={styles.center}>
                <View style={styles.line} />
              </View>
            )}
          </TouchableOpacity>
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
