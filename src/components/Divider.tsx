import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect } from "react";

type SIZE = "small" | "medium" | "large";
interface Props {
  size: SIZE;
  horizontal?: boolean;
}

const Divider = ({ size, horizontal }: Props) => {
  const space = getSize(size);
  const width = horizontal ? space : undefined;
  const height = horizontal ? undefined : space;
  return <View style={{ width, height }} />;
};

export default Divider;

const getSize = (size: SIZE) => {
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
