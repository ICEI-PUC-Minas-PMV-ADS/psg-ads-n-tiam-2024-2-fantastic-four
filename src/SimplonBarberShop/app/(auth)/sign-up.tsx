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
} from "react-native";
import React, { useState, useRef } from "react";
import { Colors } from "@/constants/Colors";
import CustomInput from "@/components/customInput";
import GoogleImg from "../../assets/images/googleImg.png";

const SignUp = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const windowWidth = Dimensions.get("window").width;

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

  return (
    <SafeAreaView
      style={{ height: "100%", backgroundColor: Colors.backgroundScreen }}
    >
      <View style={styles.body}>
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
            <CustomInput label="Email" value="" placeholder="" />
            <CustomInput label="Senha" value="" placeholder="" />
            <CustomInput label="Confirme sua senha" value="" placeholder="" />
          </View>
          <View style={{ width: windowWidth }}>
            <CustomInput label="Nome Completo" value="" placeholder="" />
            <CustomInput label="Telefone" value="" placeholder="" />
            <CustomInput label="Data de Nascimento" value="" placeholder="" />
          </View>
        </Animated.ScrollView>
        <View style={styles.stepperContainer}>
          <View
            style={currentStep === 0 ? styles.activeStep : styles.inactiveStep}
          />
          <View
            style={currentStep === 1 ? styles.activeStep : styles.inactiveStep}
          />
        </View>
        {currentStep === 1 && (
          <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={currentStep === 1 ? styles.buttonConcluir : styles.buttonNext}
          onPress={handleNextStep}
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
      </View>
    </SafeAreaView>
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
