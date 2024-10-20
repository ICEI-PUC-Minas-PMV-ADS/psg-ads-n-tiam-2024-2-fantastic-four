import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import google from '../../assets/images/googleImg.png'
interface TabIconProps {
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ color, name, focused }) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={google}
        resizeMode="contain"
        style={styles.image}
        tintColor={color}
      />
      <Text
        style={{
          fontFamily: focused ? "CircularSpotifyText-Medium" : "CircularSpotifyText-Light",
          color: color,
          fontSize: 12,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout: React.FC = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarStyle: {
            backgroundColor: "121212",
            borderTopWidth: 0.5,
            borderTopColor: "#232533",
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
  
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
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
