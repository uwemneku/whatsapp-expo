import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  CurrentTabScreenContext,
  useAnimatedTopTabContext,
} from "../../../context";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { TabRoutes } from "../../../types";

const Menu = () => {
  const currentScreenName = useAnimatedTopTabContext();
  const layout = useSharedValue({ width: 0, height: 0 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(isModalOpen ? 0 : layout.value.width * 1.5, {
          duration: 250,
        }),
      },
      {
        translateY: withTiming(isModalOpen ? 0 : -layout.value.height * 1.5, {
          duration: 250,
        }),
      },
    ],
  }));

  return (
    <View
      onLayout={({
        nativeEvent: {
          layout: { height, width, y },
        },
      }) => {
        layout.value = { height, width };
        console.log(y);
      }}
    >
      <TouchableOpacity onPress={toggleModal}>
        <Feather name="more-vertical" size={24} color="white" />
      </TouchableOpacity>
      <Modal
        visible={isModalOpen}
        animationType="fade"
        transparent
        onRequestClose={toggleModal}
      >
        <Pressable style={{ flex: 1 }} onPress={toggleModal}>
          <Animated.View style={[styles.menuContainer, animatedContainerStyle]}>
            {getMenuItem(currentScreenName.value).map((item) => (
              <Text key={item}>{item}</Text>
            ))}
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Menu;

const getMenuItem = (currentTabScreen: TabRoutes) => {
  switch (currentTabScreen) {
    case "Calls":
      return ["Clear call log", "Setting"];
    case "Chat":
      return [
        "New group",
        "New broadcast",
        "Linked devices",
        "Starred messages",
        "Settings",
      ];
    case "Status":
      return ["Status privacy", "Settings"];
    default:
      return [];
  }
};

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    alignSelf: "flex-end",
  },
});
