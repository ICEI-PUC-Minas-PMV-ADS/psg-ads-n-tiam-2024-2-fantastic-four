import React from "react";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, Image } from "react-native";
import Home from "./home";
import Profile from "./profile";
import Historic from "./historic";
import Scheduling from "./schedulling";
import Notifications from "./notifications";
import About from "./about";
import Header from "@/components/header";
import { Colors } from "@/constants/Colors";
import Customers from "./customers";
import { useAuthContext } from "../context/authContextProvider";
import Statistics from "./statistics";
import ScheddullingBarber from "./scheddullingBarber";
import Toast from "react-native-toast-message";
import toastConfig from "@/utils/toastConfig";
import { signOut } from "@/service/firebase";
import { router } from "expo-router";

type DrawerNavigatorParamList = {
  homeDrawer: undefined;
  historicDrawer: undefined;
  schedullingDrawer: undefined;
  profileDrawer: undefined;
  notificationsDrawer: undefined;
  aboutDrawer: undefined;
  statisticsTab: undefined;
  customersDrawer: undefined;
  statisticsDrawer: undefined;
  logoutDrawer: undefined;
};

type TabNavigatorParamList = {
  homeTab: undefined;
  historicTab: undefined;
  schedullingTab: undefined;
  profileTab: undefined;
  notificationsTab: undefined;
  aboutTab: undefined;
  customersTab: undefined;
  statisticsTab: undefined;
  schedullingBarberTab: undefined;
};

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();
const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabIcon: React.FC<{ color: string; name: any }> = ({ color, name }) => (
  <View style={styles.imageContainer}>
    <MaterialIcons name={name} size={30} color={color} />
  </View>
);

const TabsLayout: React.FC<{ tab: string }> = ({ tab }) => {
  const { user } = useAuthContext();

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
          height: 60,
        },
        headerShown: false,
      }}
    >
      {user?.isBarber ? (
        <>
          <Tab.Screen
            name="homeTab"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => <TabIcon color={color} name="home" />,
            }}
          />
          <Tab.Screen
            name="statisticsTab"
            component={Statistics}
            options={{
              tabBarIcon: ({ color }) => (
                <TabIcon color={color} name="equalizer" />
              ),
            }}
          />
          <Tab.Screen
            name="schedullingBarberTab"
            component={ScheddullingBarber}
            options={{
              tabBarIcon: ({ color }) => <TabIcon color={color} name="event" />,
            }}
          />
          <Tab.Screen
            name="schedullingTab"
            component={Scheduling}
            options={{
              tabBarIcon: ({ color }) => (
                <TabIcon color={color} name="add-circle" />
              ),
            }}
          />
          <Tab.Screen
            name="customersTab"
            component={Customers}
            options={{
              tabBarIcon: ({ color }) => (
                <TabIcon color={color} name={"supervisor-account"} />
              ),
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
        </>
      ) : (
        <>
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
              tabBarIcon: ({ color }) => (
                <TabIcon color={color} name="history" />
              ),
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
              tabBarIcon: ({ color }) => (
                <TabIcon color={color} name="person" />
              ),
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
        </>
      )}
    </Tab.Navigator>
  );
};

export default function DrawerWithTabs() {
  const commonScreenOptions = {
    drawerStyle: {
      backgroundColor: "black",
      width: 240,
    },
    drawerActiveTintColor: Colors.goldColor,
    drawerInactiveTintColor: "white",
    header: () => <Header />,
  };

  const { user, setIsLoggedIn } = useAuthContext();

  const handleLogout = () => {
    setIsLoggedIn(false);
    signOut();
    router.push("/");
  };

  return (
    <>
      {user?.isBarber ? (
        <Drawer.Navigator screenOptions={commonScreenOptions}>
          <Drawer.Screen
            name="homeDrawer"
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons name="home" size={24} color={color} />
              ),
              drawerLabel: "Início",
            }}
          >
            {() => <TabsLayout tab="homeTab" />}
          </Drawer.Screen>
          <Drawer.Screen
            name="statisticsDrawer"
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons name="equalizer" size={24} color={color} />
              ),
              drawerLabel: "Relatórios",
            }}
          >
            {() => <TabsLayout tab="statisticsTab" />}
          </Drawer.Screen>
          <Drawer.Screen
            name="schedullingDrawer"
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons name="event" size={24} color={color} />
              ),
              drawerLabel: "Agendamentos",
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
              drawerLabel: "Perfil",
            }}
            component={Profile}
          />
          <Drawer.Screen
            name="customersDrawer"
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons
                  name="supervisor-account"
                  size={24}
                  color={color}
                />
              ),
              drawerLabel: "Clientes",
            }}
          >
            {() => <TabsLayout tab="customersTab" />}
          </Drawer.Screen>
          <Drawer.Screen
            name="notificationsDrawer"
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons name="notifications" size={24} color={color} />
              ),
              drawerLabel: "Notificações",
            }}
          >
            {() => <TabsLayout tab="notificationsTab" />}
          </Drawer.Screen>
          <Drawer.Screen
            name="logoutDrawer"
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons name="logout" size={24} color={color} />
              ),
              drawerLabel: "Fazer Logout",
            }}
            listeners={{
              drawerItemPress: (e) => {
                e.preventDefault();
                handleLogout();
              },
            }}
          >
            {() => null}
          </Drawer.Screen>
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator screenOptions={commonScreenOptions}>
          <Drawer.Screen
            name="homeDrawer"
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons name="home" size={24} color={color} />
              ),
              drawerLabel: "Início",
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
              drawerLabel: "Histórico",
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
              drawerLabel: "Agendar serviço",
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
              drawerLabel: "Perfil",
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
              drawerLabel: "Notificações",
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
              drawerLabel: "Sobre a barbearia",
            }}
            component={About}
          />
          <Drawer.Screen
            name="logoutDrawer"
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons name="logout" size={24} color={color} />
              ),
              drawerLabel: "Fazer Logout",
            }}
            listeners={{
              drawerItemPress: (e) => {
                e.preventDefault();
                handleLogout();
              },
            }}
          >
            {() => null}
          </Drawer.Screen>
        </Drawer.Navigator>
      )}
      <Toast config={toastConfig} />
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
