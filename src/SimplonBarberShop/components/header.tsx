import { StyleSheet, View, Image } from "react-native";
import React from "react";
import logo from "../assets/images/logoHeader.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Header() {
  return (
    <View style={styles.head}>
      <View style={styles.sectioOne}>
        <MaterialIcons name="menu" size={30} color="white" />
        <View style={styles.line} />
        <Image
          resizeMode="contain"
          style={styles.image}
          source={logo}
          alt="menu lateral"
        />
      </View>
      <View style={styles.profile}>
        <MaterialIcons name="person" size={24} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    paddingBottom: 10
  },
  sectioOne: {
    display: "flex",
    flexDirection: "row",
    gap: 11,
  },
  image: {
    height: 31,
    width: 41,
  },
  line: {
    height: 30,
    width: 1,
    backgroundColor: "#43361C",
  },
  profile: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    padding: 3,
  },
});
