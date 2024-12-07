import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import Home from "./home";
import Profile from "./profile";
import Historic from "./historic";
import Scheduling from "./schedulling";
import Notifications from "./notifications";
import About from "./about";
import Header from "@/components/header";
import { Colors } from "@/constants/Colors";
import Customers from "./customers";

type DrawerNavigatorParamList = {
  homeDrawer: undefined;
  historicDrawer: undefined;
  schedullingDrawer: undefined;
  profileDrawer: undefined;
  notificationsDrawer: undefined;
  aboutDrawer: undefined;
};

type TabNavigatorParamList = {
  homeTab: undefined;
  historicTab: undefined;
  schedullingTab: undefined;
  profileTab: undefined;
  notificationsTab: undefined;
  aboutTab: undefined;
  customerTab: undefined;
};

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();
const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabIcon: React.FC<{ color: string; name: any }> = ({ color, name }) => (
  <View style={styles.imageContainer}>
    <MaterialIcons name={name} size={30} color={color} />
  </View>
);

const TabsLayout: React.FC<{ tab: string }> = ({ tab }) => {
  return (
    <Tab.Navigator
      initialRouteName={tab as keyof TabNavigatorParamList}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.goldColor,
        tabBarStyle: {
          backgroundColor: "black",
          paddingBottom: 10,
          paddingTop: 15,
          borderTopWidth: 0,
          height: 60
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="homeTab"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <TabIcon color={color} name="home" />,
        }}
      />
      <Tab.Screen
        name="historicTab"
        component={Historic}
        options={{
          tabBarIcon: ({ color }) => <TabIcon color={color} name="history" />,
        }}
      />
      <Tab.Screen
        name="schedullingTab"
        component={Scheduling}
        options={{
          tabBarIcon: ({ color }) => <TabIcon color={color} name="event" />,
        }}
      />
      <Tab.Screen
        name="profileTab"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <TabIcon color={color} name="person" />,
        }}
      />
      <Tab.Screen
        name="notificationsTab"
        component={Notifications}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon color={color} name="notifications" />
          ),
        }}
      />
      <Tab.Screen
        name="aboutTab"
        component={About}
        options={{
          tabBarIcon: ({ color }) => <TabIcon color={color} name="info" />,
        }}
      />
      <Tab.Screen
        name="customerTab"
        component={Customers}
        options={{
          tabBarIcon: ({ color }) => <TabIcon color={color} name="info" />,
        }}
      />
      
    </Tab.Navigator>
  );
};

export default function DrawerWithTabs() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "black",
          width: 240,
        },
        drawerActiveTintColor: Colors.goldColor,
        drawerInactiveTintColor: "white",
        header: () => <Header />,
      }}
    >
      <Drawer.Screen
        name="homeDrawer"
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
          drawerLabel: "Home",
        }}
      >
        {() => <TabsLayout tab="homeTab" />}
      </Drawer.Screen>

      <Drawer.Screen
        name="historicDrawer"
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="history" size={24} color={color} />
          ),
          drawerLabel: "Historic",
        }}
      >
        {() => <TabsLayout tab="historicTab" />}
      </Drawer.Screen>

      <Drawer.Screen
        name="schedullingDrawer"
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="event" size={24} color={color} />
          ),
          drawerLabel: "Schedulling",
        }}
      >
        {() => <TabsLayout tab="schedullingTab" />}
      </Drawer.Screen>

      <Drawer.Screen
        name="profileDrawer"
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
          drawerLabel: "Profile",
        }}
      >
        {() => <TabsLayout tab="profileTab" />}
      </Drawer.Screen>

      <Drawer.Screen
        name="notificationsDrawer"
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="notifications" size={24} color={color} />
          ),
          drawerLabel: "Notifications",
        }}
      >
        {() => <TabsLayout tab="notificationsTab" />}
      </Drawer.Screen>

      <Drawer.Screen
        name="aboutDrawer"
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="info" size={24} color={color} />
          ),
          drawerLabel: "About",
        }}
      >
        {() => <TabsLayout tab="aboutTab" />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
