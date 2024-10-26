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
import Header from "@/components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Icon from 'react-native-vector-icons/AntDesign'
interface TabIconProps {
  color: string;
  name: string;
  imgSource?: any;
  icon?: any;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({
  icon,
  imgSource,
  color,
  name,
  focused,
}) => {
  return (
    <View style={styles.imageContainer}>
      {imgSource ? (
        <Image
          source={imgSource}
          resizeMode="contain"
          style={styles.image}
          tintColor={color}
        />
      ) : (
        <Icon name="github" size={24}/>
      )}

      <Text
        style={{
          fontFamily: focused
            ? "CircularSpotifyText-Medium"
            : "CircularSpotifyText-Light",
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
    <SafeAreaView
      style={{
        height: "100%",
        paddingHorizontal: 24,
        backgroundColor: Colors.backgroundScreen,
      }}
    >
      <Header />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#D2B070",
          tabBarStyle: {
            backgroundColor: "121212",
            height: 80,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="Home" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="Profile" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="schedulling"
          options={{
            title: "Schedulling",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="Schedulling" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="historic"
          options={{
            title: "Historic",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="Historic" focused={focused} />
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
