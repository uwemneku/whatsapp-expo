import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import TabText from "./TabText";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { TAB_SCREENS } from "../../../constants";
import { Divider, Text } from "../../../components";

interface Props {
  scrollOffset: SharedValue<number>;
  scrollToIndex: (index: number) => void;
}

const CAMERA_WIDTH = 40;
const [, ...SCREENS] = TAB_SCREENS; // extract all screens except the first one (Camera)

const TabHeader = ({ scrollOffset, scrollToIndex }: Props) => {
  const { width } = useWindowDimensions();
  const containerHeight = useSharedValue(0);
  const SCROLL_INDICATOR_WIDTH = (width - CAMERA_WIDTH) / SCREENS.length;

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollOffset.value,
          [0, width, width * TAB_SCREENS.length],
          [0, CAMERA_WIDTH, width],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(
      scrollOffset.value,
      [0, width],
      [-containerHeight.value, 0],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <Animated.View
      style={[styles.container, { paddingTop: 10 }, animatedContainerStyle]}
      onLayout={({ nativeEvent }) => {
        containerHeight.value = nativeEvent.layout.height;
      }}
    >
      <View style={styles.header}>
        <Text size="large" color="white" style={{ flex: 1 }}>
          WhatsApp
        </Text>
        <Ionicons name="search-sharp" size={24} color="white" />
        <Divider horizontal size="medium" />
        <Feather name="more-vertical" size={24} color="white" />
      </View>
      <Divider size="small" />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            scrollToIndex(0);
          }}
          style={styles.camera}
        >
          <FontAwesome name="camera" size={20} color="rgba(225,225,225, 0.8)" />
        </TouchableOpacity>
        <View style={styles.tabsContainer}>
          {SCREENS.map((label, index) => (
            <TouchableOpacity
              key={label}
              style={styles.tabs}
              onPress={() => scrollToIndex(index + 1)}
            >
              <TabText index={index + 1} {...{ label, scrollOffset }} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Animated.View
        style={[
          styles.indicator,
          { width: SCROLL_INDICATOR_WIDTH },
          animatedIndicatorStyle,
        ]}
      />
    </Animated.View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#008069",
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  tabs: {
    paddingVertical: 20,
    paddingBottom: 5,
  },
  indicator: {
    height: 5,
    backgroundColor: "#fff",
    elevation: 2,
    marginTop: 8,
  },
  camera: {
    width: CAMERA_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 5,
  },
});
