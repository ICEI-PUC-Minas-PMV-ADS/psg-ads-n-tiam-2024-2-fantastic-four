import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import hamburger from "../assets/images/hamburger.png";
import separador from "../assets/images/separador.png";
import logo from "../assets/images/logoHeader.png";
import userImage from "../assets/images/userDefault.png";

export default function Header() {
  return (
    <View style={styles.head}>
      <View style={styles.sectioOne}>
        <Image source={hamburger} alt="menu lateral" />
        <Image  source={separador} alt="menu lateral" />
        <Image  source={logo} alt="menu lateral" />
      </View>

      <Image  source={userImage} alt="menu lateral" />
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#121212",
    paddingTop: 30,
    
  },
  sectioOne:{
    display:'flex',
    flexDirection: 'row',
    gap:11
  },
  hamburger: {
    height: 34,
  },
  separador: {
    height: 34,
  },
  
});
