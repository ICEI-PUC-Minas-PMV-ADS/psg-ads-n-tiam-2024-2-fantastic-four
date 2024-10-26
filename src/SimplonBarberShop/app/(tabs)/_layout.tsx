import { View, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
interface TabIconProps {
  color: string;
  name: any;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ color, name, focused }) => (
  <View style={styles.imageContainer}>
    <MaterialIcons name={name} size={30} color={color} />
  </View>
);

const TabsLayout: React.FC = () => {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        paddingTop: 0,
      }}
      edges={["left", "right", "bottom"]}
    >
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.goldColor,
          tabBarStyle: {
            backgroundColor: "black",
            height: 85,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingHorizontal: 20,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="home" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="historic"
          options={{
            title: "Historic",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="history" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="schedulling"
          options={{
            title: "Schedulling",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name={"event"} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="person" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="notifications" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  image: {
    width: 20,
    height: 20,
  },
});
