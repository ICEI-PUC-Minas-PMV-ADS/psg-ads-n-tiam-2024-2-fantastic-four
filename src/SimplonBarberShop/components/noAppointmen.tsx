// Componente para exibir um agendamento
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 



const NoAppointment = () => {
  return (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="calendar-today" size={54} color="#4F5050" />
      <Text style={styles.emptyText}>Sem agendamentos</Text>
    </View>
  );
};

export { NoAppointment };

const styles = StyleSheet.create({
  
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 20,
    color: "#4F5050",
    marginTop: 10,
    
  },
});
