import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MobileLayout from '@/components/layout/mobileLayout';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import logo from "../../assets/images/logo.png";

const About = () => {
  const handlePhonePress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/barbeariasimplon');
  };

  const handleOpenInMaps = () => {
    const latitude = -19.935723;
    const longitude = -43.937513;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('Erro ao abrir o mapa:', err));
  };

  return (
    <MobileLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquam efficitur posuere...
          </Text>
        </View>

        <View style={styles.videoContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/300x150' }} style={styles.videoThumbnail} />
        </View>

        <View style={styles.ceoContainer}>
          <View style={styles.ceoProfile}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.ceoImage} />
            <Text style={styles.ceoName}>CEO e Barbeiro Fábio</Text>
            <Text style={styles.ceoDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </View>
          <View style={styles.ceoProfile}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.ceoImage} />
            <Text style={styles.ceoName}>CEO e Barbeiro Alexandre</Text>
            <Text style={styles.ceoDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.locationTitle}>Localização</Text>
          <Text style={styles.address}>Rua Monte Simplon, 1124 - Salgado Filho</Text>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -19.93836240498259,
              longitude: -43.98023166838319,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{ latitude: -19.935723, longitude: -43.937513 }}
              title="Meu Local"
              description="Rua Monte Simplon, 1124 - Salgado Filho"
              onPress={handleOpenInMaps}
            />
          </MapView>
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contato</Text>
          <TouchableOpacity
            style={styles.contactButtonWithoutIcon}
            onPress={() => handlePhonePress('(31) 3372-1686')}
          >
            <MaterialIcons name="phone" size={24} color="#fff" />
            <Text style={styles.contactText}>(31) 3372-1686</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => handlePhonePress('(31) 9 9165-0801')}
          >
            <MaterialIcons name="phone" size={24} color="#fff" />
            <Text style={styles.contactText}>(31) 9 9165-0801 | Fábio</Text>
            <FontAwesome name="whatsapp" size={24} color="#D2B070" style={styles.whatsappIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => handlePhonePress('(31) 9 9988-3988')}
          >
            <MaterialIcons name="phone" size={24} color="#fff" />
            <Text style={styles.contactText}>(31) 9 9988-3988 | Alexandre</Text>
            <FontAwesome name="whatsapp" size={24} color="#D2B070" style={styles.whatsappIcon} />
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
  logoContainer: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 161, height: 168, resizeMode: 'contain' },
  description: {
    textAlign: 'justify',
    fontSize: 14,
    fontFamily: "CircularSpotifyText-Book",
    color: '#fff',
    marginTop: 8,
    marginBottom: 17,
  },
  videoContainer: { alignItems: 'center', marginBottom: 30, position: 'relative' },
  videoThumbnail: { width: '100%', height: 150, borderRadius: 8, marginBottom: 25 },
  ceoContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  ceoProfile: { alignItems: 'center', flex: 1, marginHorizontal: 8 },
  ceoImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  ceoName: { fontSize: 16, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  ceoDescription: { fontSize: 12, color: '#aaa', textAlign: 'justify', marginBottom: 35 },
  mapContainer: { marginBottom: 49 },
  locationTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  address: { fontSize: 14, color: '#AFAFAF', marginBottom: 8, textAlign: 'justify' },
  map: { width: '100%', height: 200, borderRadius: 8 },
  contactContainer: { alignItems: 'center', marginBottom: 16 },
  contactTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  contactButtonWithoutIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(161, 161, 161, 0.23)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '90%',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(161, 161, 161, 0.23)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '90%',
  },
  contactText: { fontSize: 14, color: '#fff', marginLeft: 8 },
  line: { height: 1, backgroundColor: '#D2B070', alignSelf: 'center', width: '80%', marginVertical: 16 },
  instagramContainer: { alignItems: 'center', marginTop: 8 },
  instagramText: { color: '#FFFFFF', fontSize: 15, marginTop: 8 },
  whatsappIcon: { marginLeft: 8 }, // Adicionado
});
