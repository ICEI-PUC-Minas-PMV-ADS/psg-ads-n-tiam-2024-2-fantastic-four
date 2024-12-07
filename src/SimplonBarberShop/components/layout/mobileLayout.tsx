import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const insets = useSafeAreaInsets(); 

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient 
        colors={['#000000', '#121212']}
        style={[styles.gradient, { paddingTop: insets.top + 20 }]}
      >
        <ScrollView 
          contentContainerStyle={{
            paddingBottom: 20,
            paddingTop: insets.top,
          }}
        >
          {children}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default MobileLayout;

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    width: "100%",
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
