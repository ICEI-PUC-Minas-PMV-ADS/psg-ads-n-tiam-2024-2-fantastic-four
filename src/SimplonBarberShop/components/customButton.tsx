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

interface CustomButtonProps {
  title: string;
  buttonStyle?: ViewStyle;
  source?: ImageSourcePropType;
  onPress: () => void;
  width: DimensionValue;
  backgroundColor: string;
  border?: number;
  borderColor?: string;
  textColor: string;
  iconSize?: number;
}

export default function CustomButton({
  title,
  onPress,
  buttonStyle,
  source,
  width,
  backgroundColor,
  border,
  borderColor,
  textColor,
  iconSize,
}: CustomButtonProps) {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          buttonStyle,
          {
            width: width,
            backgroundColor: backgroundColor,
            borderColor: borderColor || "transparent",
            justifyContent: source ? "space-between" : "center",
            borderWidth: border ? 1 : 0,
          },
        ]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
        {source && (
          <Image
            source={source}
            style={{ width: iconSize, height: iconSize }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 13,
  },
  buttonText: {
    fontFamily: "CircularSpotifyText-Medium",
    fontSize: 18,
    color: "#fff", // Adicionei uma cor de texto padrão
  },
});
