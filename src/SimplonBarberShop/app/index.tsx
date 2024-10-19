import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import customButton from "../components/customButton";

const App = (navigation: any) => {
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#121212" }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            minHeight: "100%",
          }}
        >
          <Image
            source={require("../assets/images/barberPole.png")}
            style={styles.background}
            resizeMode="cover"
          />

          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(auth)/sign-in")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={() => router.push("/(auth)/sign-up")}
          >
            <Text style={styles.registerButtonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: 450,
    minHeight: 650,
  },
  container: {
    height: "100%",
    backgroundColor: "#121212",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 212,
    position: "absolute",
    top: "55%",
  },
  button: {
    width: 310,
    padding: 15,
    backgroundColor: "#AE8333",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    top: 50,
  },
  registerButton: {
    backgroundColor: "transparent",
    borderColor: "#AE8333",
    borderWidth: 1,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "CircularSpotifyText-Bold"
  },
  registerButtonText: {
    color: "#AE8333",
    fontSize: 20,
    fontFamily: "CircularSpotifyText-Bold"
  },
});

export default App;
