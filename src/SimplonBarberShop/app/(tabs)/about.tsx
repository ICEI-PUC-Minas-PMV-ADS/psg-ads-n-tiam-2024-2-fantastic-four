import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MobileLayout from "@/components/layout/mobileLayout";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import logo from "../../assets/images/logo.png";
import Fabio from "../../assets/images/Fabio.png";
import Alexandre from "../../assets/images/Alexandre.png";
import Video from "react-native-video";

const About = () => {
  const handlePhonePress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWhatsappPress = (phoneNumber: string) => {
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  };

  const handleInstagramPress = () => {
    Linking.openURL("https://www.instagram.com/barbeariasimplon");
  };

  const handleOpenInMaps = () => {
    const latitude = -19.93802;
    const longitude = -43.9802;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir o mapa:", err)
    );
  };

  return (
    <MobileLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.description}>
            Há 30 anos, uma amizade deu origem a uma parceria que se transformou
            em uma história de sucesso e tradição: a Barbearia Simplon. No mesmo
            endereço onde tudo começou, mantemos vivo o espírito de acolhimento
            e excelência que conquistou gerações. Dois amigos, movidos pela
            paixão pelo ofício e pela vontade de fazer a diferença, se uniram
            sem imaginar que essa sociedade resistiria ao tempo e se tornaria
            referência na comunidade. Hoje, temos o orgulho de atender amigos
            que estão conosco desde os primeiros dias e de dar as boas-vindas à
            terceira geração de clientes, filhos e netos daqueles que nos
            confiaram sua confiança e seu estilo.
          </Text>
        </View>

        {/*<View style={styles.videoContainer}>
          <Video
            source={require("../../videoApresentacao.mp4")} // Corrigir o caminho do vídeo
            style={styles.video}
            controls={true} // Mostra controles de play/pause
            resizeMode="cover" // Ajusta o vídeo para cobrir a área
          />
        </View>*/}

        <View style={styles.ceoContainer}>
          <View style={styles.ceoProfile}>
            <Image source={Fabio} style={styles.ceoImage} />
            <Text style={styles.ceoName}>CEO e Barbeiro Fábio</Text>
            <Text style={styles.ceoDescription}>
              Com mais de 30 anos de experiência como barbeiro, Fábio é um dos
              fundadores da Barbearia Simplon.
            </Text>
          </View>
          <View style={styles.ceoProfile}>
            <Image source={Alexandre} style={styles.ceoImage} />
            <Text style={styles.ceoName}>CEO e Barbeiro Alexandre</Text>
            <Text style={styles.ceoDescription}>
              Co-fundador da Barbearia Simplon, Alexandre soma mais de três
              décadas de dedicação à profissão de barbeiro.
            </Text>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.locationTitle}>Localização</Text>
          <Text style={styles.address}>
            Rua Monte Simplon, 1124 - Salgado Filho
          </Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -19.93823,
              longitude: -43.98028,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker
              coordinate={{ latitude: -19.93823, longitude: -43.98028 }}
              onPress={handleOpenInMaps}
            />
          </MapView>

          {/* Botão para abrir diretamente no Google Maps */}
          <TouchableOpacity onPress={handleOpenInMaps}>
            <Text>Abrir no Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contato</Text>

          <TouchableOpacity
            style={styles.contactButtonWithoutIcon}
            onPress={() => handlePhonePress("(31) 3372-1686")}
          >
            <MaterialIcons name="phone" size={24} color="#fff" />
            <Text
              style={{
                fontSize: 14,
                color: "#fff",
                marginLeft: 8,
                textAlign: "center",
              }}
            >
              (31) 3372-1686
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton}>
            <MaterialIcons
              name="phone"
              size={24}
              color="#fff"
              onPress={() => handlePhonePress("+5531991650801")} // Discar
            />
            <Text style={styles.contactText}>Fábio</Text>
            <FontAwesome
              name="whatsapp"
              size={24}
              color="#D2B070"
              style={styles.whatsappIcon}
              onPress={() => handleWhatsappPress("+5531991650801")} // WhatsApp
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton}>
            <MaterialIcons
              name="phone"
              size={24}
              color="#fff"
              onPress={() => handlePhonePress("+5531999883988")} // Discar
            />
            <Text style={styles.contactText}>Alexandre</Text>
            <FontAwesome
              name="whatsapp"
              size={24}
              color="#D2B070"
              style={styles.whatsappIcon}
              onPress={() => handleWhatsappPress("+5531999883988")} // WhatsApp
            />
          </TouchableOpacity>
          <View style={styles.line} />

          <TouchableOpacity
            style={styles.instagramContainer}
            onPress={handleInstagramPress}
          >
            <FontAwesome name="instagram" size={32} color="#D2B070" />
            <Text style={styles.instagramText}>@barbeariasimplon</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </MobileLayout>
  );
};

export default About;

const styles = StyleSheet.create({
  container: { padding: 16 },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logo: { width: 161, height: 168, resizeMode: "contain" },
  description: {
    textAlign: "justify",
    fontSize: 14,
    fontFamily: "CircularSpotifyText-Book",
    color: "#fff",
    marginTop: 8,
    marginBottom: 17,
  },
  videoContainer: {
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  videoThumbnail: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 25,
  },
  ceoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  ceoProfile: { alignItems: "center", flex: 1, marginHorizontal: 8 },
  ceoImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  ceoName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  ceoDescription: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 35,
  },
  mapContainer: { marginBottom: 49 },
  locationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: "#AFAFAF",
    marginBottom: 8,
    textAlign: "justify",
  },
  map: { width: "100%", height: 200, borderRadius: 8 },
  contactContainer: { alignItems: "center", marginBottom: 16 },
  contactTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  contactButtonWithoutIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(161, 161, 161, 0.23)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: "90%",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(161, 161, 161, 0.23)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: "90%",
  },
  contactText: { fontSize: 14, color: "#fff", marginLeft: 8 },
  line: {
    height: 1,
    backgroundColor: "#D2B070",
    alignSelf: "center",
    width: "80%",
    marginVertical: 16,
  },
  instagramContainer: { alignItems: "center", marginTop: 8 },
  instagramText: { color: "#FFFFFF", fontSize: 15, marginTop: 8 },
  whatsappIcon: { marginLeft: 8 },
  video: {
    width: "100%",
    height: "100%",
  },
});
