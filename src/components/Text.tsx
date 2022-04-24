import { StyleSheet, Text, TextProps, View } from "react-native";
import React from "react";

interface Props extends TextProps {
  color?: string;
  size?: "small" | "medium" | "large";
}

const AppText = ({ color, size = "medium", style, ...props }: Props) => {
  const fontSize = getFontSize(size);
  return (
    <Text style={[{ color, fontSize, fontFamily: "bold" }, style]} {...props} />
  );
};

const getFontSize = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return 12;
    case "medium":
      return 18;
    case "large":
      return 24;
    default:
      return 18;
  }
};

export default AppText;

const styles = StyleSheet.create({});
