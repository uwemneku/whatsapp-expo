import {
  StyleSheet,
  View,
  TouchableOpacity as Touchable_Opacity,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { TabRoutes } from "../../../types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CurrentTabScreenContext } from "../../../context";

type icons = "add-ic-call" | "photo-camera" | "messenger";

const TouchableOpacity = Animated.createAnimatedComponent(Pressable);
const FAB = () => {
  const [currentIcon, setCurrentIcon] = useState<icons>("messenger");
  const currentTopTabScreen = useContext(CurrentTabScreenContext);

  //Change the FAB icon when the user changes the tab
  useAnimatedReaction(
    () => currentTopTabScreen.value,
    (screenName) => {
      const iconName = getIcon(screenName);
      runOnJS(setCurrentIcon)(iconName);
    }
  );

  // Translate the pen icon into view when user is in the status screen
  const animatedPenStyle = useAnimatedStyle(() => {
    const offSetY = currentTopTabScreen.value === "Status" ? 0 : 70;
    return {
      transform: [{ translateY: withTiming(offSetY, { duration: 250 }) }],
    };
  });

  return (
    <View>
      <TouchableOpacity
        onPress={() => console.log("pen")}
        style={[styles.item, styles.pen, animatedPenStyle]}
        onLayout={({ nativeEvent: { layout } }) => console.log(layout)}
      >
        <Ionicons name="ios-pencil-sharp" size={30} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.item, styles.green]}
        onPress={() => console.log("sss")}
      >
        <MaterialIcons name={currentIcon} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const getIcon = (activeScreen: TabRoutes): icons => {
  "worklet";
  switch (activeScreen) {
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
    position: "relative",
    width: 60,
    height: 60,
    bottom: 10,
    right: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  green: {
    backgroundColor: "#008069",
    zIndex: 2,
  },
  pen: {
    backgroundColor: "rgba(225,225,225, 0.8)",
    zIndex: 2,
    marginBottom: 10,
  },
});
