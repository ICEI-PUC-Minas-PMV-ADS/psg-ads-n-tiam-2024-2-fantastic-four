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
  icon?: ImageSourcePropType;
  onPress: () => void;
  width: DimensionValue;
  backgroundColor: string;
  border?: number;
  borderColor?: string;
  textColor: string;
  iconSize?: number;
  isAction: boolean;
  notificatioData?: string;
}

function NotificationCard({
  mensage,
  onPress,
  buttonStyle,
  icon,
  width,
  backgroundColor,
  border,
  borderColor,
  textColor,
  iconSize = 40,
  isAction,
  notificatioData,
}: NotificationCardProps) {
  return (
    <View style={styles.container}>
      {icon && (
        <View style={styles.iconContainer}>
          <Image source={icon} style={[styles.icon, { width: iconSize, height: iconSize }]} />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={[styles.mensageText, { color: textColor }]}>{mensage}</Text>
        {notificatioData && (
          <Text style={styles.notificatioDataText}>{notificatioData}</Text>
        )}
        {isAction && (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                buttonStyle,
                {
                  width: width,
                  backgroundColor: "#f8d7da",
                  borderColor: borderColor || "transparent",
                  borderWidth: border ? 1 : 0,
                },
              ]}
              onPress={onPress}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                buttonStyle,
                {
                  width: width,
                  backgroundColor: "#d4edda",
                  borderColor: borderColor || "transparent",
                  borderWidth: border ? 1 : 0,
                },
              ]}
              onPress={onPress}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 16,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  mensageText: {
    fontFamily: "CircularSpotifyText-Medium",
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  notificatioDataText: {
    fontFamily: "CircularSpotifyText-Regular",
    fontSize: 14,
    color: "#666",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: "#f8d7da",
  },
  confirmButton: {
    backgroundColor: "#d4edda",
  },
  buttonText: {
    fontFamily: "CircularSpotifyText-Medium",
    fontSize: 14,
    color: "#fff",
  },
});
