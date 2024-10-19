import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import CustomInput from "@/components/customInput";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";

const SignIn = () => {
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Text style={{ color: "white",fontFamily: 'CircularSpotifyText-Medium', marginTop:57 }}>Realize seu login</Text>
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
            <CustomInput value="" placeholder="Digite seu e-mail" />
            <CustomInput value="" placeholder="Digite sua senha" />
          </View>
          <View>
            <TouchableOpacity onPress={() => {}} style={styles.buttonLogin}>
              <Text style={{fontFamily: 'CircularSpotifyText-Bold',fontSize:20,color:'white'}}>Login</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{
                  height: 35,
                  color: "#D2B070",
                  marginTop: 10,
                  fontFamily: 'CircularSpotifyText-Bold'
                }}
              >
                Esqueci minha senha
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registrar}>
            <Text style={{ color: "#AE8333",fontFamily: 'CircularSpotifyText-Bold' }}>Não possui cadastro? </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{
                  color: "#D2B070",
                  fontFamily: 'CircularSpotifyText-Bold'
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
