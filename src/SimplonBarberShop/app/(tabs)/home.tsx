import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuthContext } from "../context/authContextProvider";
import CustomButton from "@/components/customButton";
import moreIcon from "../../assets/icons/more.png";
import backReserv from "../../assets/icons/backReserv.png";
import { router } from "expo-router";
import MobileLayout from "@/components/layout/mobileLayout";

const Home = () => {
  const { user } = useAuthContext();

  const firstName = user?.nome?.split(" ")[0];
  const formattedFirstName = firstName
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    : "";

  return (
    <MobileLayout>
      <Text
        style={{
          fontSize: 40,
          fontFamily: "CircularSpotifyText-Bold",
          color: "white",
        }}
      >
        Olá, {formattedFirstName}
      </Text>
      <View style={{ display: "flex", gap: 12 }}>
        <CustomButton
          title={"Novo agendamento"}
          onPress={() => router.push("../schedulling")}
          width={310}
          backgroundColor={"#D2B070"}
          source={moreIcon}
          iconSize={24}
          textColor="#121212"
        />
        <CustomButton
          title={"Reserva Agendamento"}
          onPress={() => router.push("../historic")}
          width={310}
          backgroundColor={"#121212"}
          source={backReserv}
          border={1}
          borderColor="#D2B070"
          iconSize={19}
          textColor="#D2B070"
        />
      </View>
    </MobileLayout>
  );
};

export default Home;

const styles = StyleSheet.create({});
