import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface HeaderProps {
    name: string;
    idade: number;
    email: string;
}

const header = ({name, idade, email}: HeaderProps) => {
  return (
    <View>
      <Text>header</Text>
    </View>
  )
}

export default header

const styles = StyleSheet.create({})