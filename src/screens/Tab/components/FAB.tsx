import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useContext, useState } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TabRoutes } from "../../../types";
import { TAB_SCREENS } from "../../../constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CurrentTabContext } from "../../../context";

type icons = "add-ic-call" | "photo-camera" | "messenger";

const FAB = () => {
  const activeTab = useSharedValue<TabRoutes>("Chat");
  const [currentIcon, setCurrentIcon] = useState<icons>("messenger");
  const currentIndex = useContext(CurrentTabContext);

  //This sets the value of the active tab based on the scroll offset
  useAnimatedReaction(
    () => currentIndex.value,
    (p) => {
      activeTab.value = TAB_SCREENS[p];
      runOnJS(setCurrentIcon)(getIcon(activeTab.value));
    }
  );

  const animatedPenStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(activeTab.value === "Status" ? -70 : 0, {
          duration: 250,
        }),
      },
    ],
  }));

  return (
    <View>
      <View style={[styles.item, styles.green]}>
        <MaterialIcons name={currentIcon} size={24} color="white" />
      </View>
      <Animated.View style={[styles.item, styles.pen, animatedPenStyle]}>
        <Ionicons name="ios-pencil-sharp" size={30} color="gray" />
      </Animated.View>
    </View>
  );
};

const getIcon = (active: TabRoutes): icons => {
  "worklet";
  switch (active) {
    case "Chat":
      return "messenger";
    case "Status":
      return "photo-camera";
    case "Calls":
      return "add-ic-call";
    default:
      return "messenger";
  }
};
export default FAB;

const styles = StyleSheet.create({
  item: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 10,
    right: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  green: {
    backgroundColor: "#008069",
    zIndex: 2,
  },
  pen: {
    backgroundColor: "rgba(225,225,225, 0.8)",
    zIndex: 1,
  },
});
