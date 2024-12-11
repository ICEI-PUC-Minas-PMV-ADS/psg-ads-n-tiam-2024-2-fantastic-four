import React from "react";
import {
  BaseToast,
  ErrorToast,
  ToastConfigParams,
} from "react-native-toast-message";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

const toastConfig = {
  success: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#28a745",
        backgroundColor: "#d4edda",
        zIndex: 1000,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
      }}
      text2Style={{
        fontSize: 14,
        color: "#000",
      }}
      renderLeadingIcon={() => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            paddingLeft: 10,
          }}
        >
          <MaterialIcons name="check-circle" size={24} color="#28a745" />
        </View>
      )}
    />
  ),

  error: (props: ToastConfigParams<any>) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#dc3545",
        backgroundColor: "#f8d7da",
        zIndex: 1000,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
      }}
      text2Style={{
        fontSize: 14,
        color: "#000",
      }}
      renderLeadingIcon={() => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            paddingLeft: 10,
          }}
        >
          <MaterialIcons name="error" size={24} color="#dc3545" />
        </View>
      )}
    />
  ),
};

export default toastConfig;
