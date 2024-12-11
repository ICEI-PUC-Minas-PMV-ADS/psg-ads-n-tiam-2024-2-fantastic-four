import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface CancelButtonProps {
   
    onPress: () => void;
  }
function CancelButton({onPress}:CancelButtonProps){

  return (
    <TouchableOpacity
    style={styles.button}
    onPress={onPress}
    >
      <Text style={styles.buttonText}>Cancelar</Text>
    </TouchableOpacity>
  )
}

export default CancelButton;

const styles = StyleSheet.create({
    button:{
        flex: 1,
        width: 64,
        alignItems: 'center',
        backgroundColor: "#AE3333",
        borderRadius: 8,
        padding: 5,
    },
    buttonText: {
        fontFamily: "CircularSpotifyText-Medium",
        fontSize: 11,
        color: "#fff",
      },
})