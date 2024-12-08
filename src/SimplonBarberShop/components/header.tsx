import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import logo from "../assets/images/logoHeader.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import type { DrawerNavigationProp } from "@react-navigation/drawer";

type RootDrawerParamList = {
  Home: undefined;
  Profile: undefined;
};

export default function Header() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  
  return (
    <View style={styles.head}>
      <View style={styles.sectioOne}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.line} />
        <Image
          resizeMode="contain"
          style={styles.image}
          source={logo}
          alt="menu lateral"
        />
      </View>
      <TouchableOpacity style={styles.profile} onPress={() => navigation.navigate("profileDrawer" as never)}>
        <MaterialIcons name="person" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
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
