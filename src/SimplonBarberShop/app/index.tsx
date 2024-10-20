import { Image, TouchableOpacity, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import { AuthProvider, useAuthContext } from "./context/authContextProvider";

const App = () => {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <AuthProvider>
      <SafeAreaView style={{ height: "100%", backgroundColor: "#121212" }}>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              height: "100%",
            }}
          >
            <View>
              <Image
                source={require("../assets/images/barberPole.png")}
                style={styles.background}
                resizeMode="contain"
              />
            </View>
            <View>
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
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    minHeight: 500,
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
    top: "46%",
    zIndex: 10,
  },
  button: {
    width: 275,
    height: 48,
    backgroundColor: "#AE8333",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 10
  },
  registerButton: {
    backgroundColor: "transparent",
    borderColor: "#AE8333",
    borderWidth: 1,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "CircularSpotifyText-Bold",
  },
  registerButtonText: {
    color: "#AE8333",
    fontSize: 18,
    fontFamily: "CircularSpotifyText-Bold",
  },
});
 export default App;
