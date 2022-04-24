import { StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Text } from "../../../components";
interface Props {
  label: string;
  index: number;
  scrollOffset: SharedValue<number>;
}
const TabText = ({ index, label, scrollOffset }: Props) => {
  const { width } = useWindowDimensions();
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    ),
  }));
  return (
    <Animated.View style={animatedStyle}>
      <Text style={styles.text}>{label}</Text>
    </Animated.View>
  );
};

export default TabText;

const styles = StyleSheet.create({
  text: {
    color: "white",
    // fontWeight: //"bold",
    fontFamily: "bold",
  },
});
