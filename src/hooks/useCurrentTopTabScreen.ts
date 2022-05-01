import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { TabRoutes } from "../types";
import { CurrentTabScreenContext } from "../context";
import { runOnJS, useAnimatedReaction } from "react-native-reanimated";

const useCurrentTopTabScreen = () => {
  const currentTopTabScreen = useContext(CurrentTabScreenContext);
  const [currentScreen, setCurrentScreen] = useState<TabRoutes>("Camera");
  //Change the FAB icon when the user changes the tab
  useAnimatedReaction(
    () => currentTopTabScreen.value,
    (screenName) => {
      runOnJS(setCurrentScreen)(screenName);
    }
  );
  return currentScreen;
};

export default useCurrentTopTabScreen;
