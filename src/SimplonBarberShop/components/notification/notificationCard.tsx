import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ViewStyle,
  ImageSourcePropType,
  DimensionValue,
} from "react-native";

interface NotificationCardProps {
  mensage: string;
  buttonStyle?: ViewStyle;
  icon?: any;
  onPressCancel: () => void;
  onPressConfirm: () => void;

  backgroundColor: string;
  border?: number;
  borderColor?: string;
  textColor: string;

  isAction: boolean;
  notificatioData?: string;
}

function NotificationCard({
  mensage,
  onPressCancel,
  onPressConfirm,
  buttonStyle,
  icon,

  backgroundColor,
  border,
  borderColor,
  textColor,
  isAction,
  notificatioData,
}: NotificationCardProps) {
  return (
    <View style={styles.container}>
      {icon && <MaterialIcons name={icon} size={30} color={Colors.goldColor} />}
      <View style={styles.alignBtnData}>
        <View style={styles.textContainer}>
          <Text style={[styles.mensageText, { color: "white" }]}>
            {mensage}
          </Text>
        </View>
        <View
          style={[
            styles.containerAction,
            { justifyContent: isAction ? "space-between" : "flex-end" },
          ]}
        >
          <Text style={styles.notificatioDataText}>{notificatioData}</Text>

          {isAction && (
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.cancelButton,
                  buttonStyle,
                  {
                    borderColor: borderColor || "black",
                    borderWidth: border ? 1 : 0,
                  },
                ]}
                onPress={onPressCancel}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.confirmButton,
                  buttonStyle,
                  {
                    borderColor: borderColor || "transparent",
                    borderWidth: border ? 1 : 0,
                  },
                ]}
                onPress={onPressConfirm}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#4F5050",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.0,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    color: "white",
  },
  alignBtnData: {
    flex: 1,
    flexDirection: "column",
  },
  containerAction: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  mensageText: {
    fontFamily: "CircularSpotifyText-Medium",
    fontSize: 10,
    color: "#333",
  },
  notificatioDataText: {
    fontFamily: "CircularSpotifyText-Medium",
    fontSize: 10,
    color: "#AFAFAF",
    marginBottom: 4,
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginLeft: 7,
  },
  button: {
    borderRadius: 8,
    padding: 4,
  },
  cancelButton: {
    backgroundColor: "#AE3333",
  },
  confirmButton: {
    backgroundColor: "#079010",
  },
  buttonText: {
    fontFamily: "CircularSpotifyText-Medium",
    fontSize: 11,
    color: "#fff",
  },
});
