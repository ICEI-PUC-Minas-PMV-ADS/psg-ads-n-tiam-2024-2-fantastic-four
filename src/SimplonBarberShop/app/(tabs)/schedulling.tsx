import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MobileLayout from '@/components/layout/mobileLayout'
import BarberSelect from '@/components/schedulling/barberSelect'
import ServiceSelect from '@/components/schedulling/serviceSelect'
import DateTimeSelect from '@/components/schedulling/dateTimeSelect'

const Schedulling = () => {
  return (
    <MobileLayout>
      <View style={styles.container}>
      <Text style={styles.title}>Agendamento</Text>
      <BarberSelect />
      <ServiceSelect />
      <DateTimeSelect />
      </View>
    </MobileLayout>
  )
}

export default Schedulling

const styles = StyleSheet.create({
  title: {
    fontFamily: "CircularSpotifyText-Bold",
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    alignItems: 'center'
  }
})