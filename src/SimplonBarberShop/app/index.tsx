import { ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";

const App = () => {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <ScrollView
        contentContainerStyle={stylesHeader.header}
      >
        <Text style={{color: 'white'}}>Hello World</Text>
      </ScrollView>
      <StatusBar  style="light" />
    </SafeAreaView>
  );
};

export default App;

export const stylesHeader = StyleSheet.create({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
    backgroundColor: Colors.light.background
  }
 
});
