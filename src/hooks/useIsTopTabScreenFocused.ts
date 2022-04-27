import { useContext, useState } from "react";
import { runOnJS, useAnimatedReaction } from "react-native-reanimated";
import { TAB_SCREENS } from "../constants";
import { CurrentTabContext } from "../context";
import { TabRoutes } from "../types";

const useIsTopTabScreenFocused = (screenName: TabRoutes) => {
  const [isScreenFocused, setIsScreenFocused] = useState(false);
  const currentIndex = useContext(CurrentTabContext);
  useAnimatedReaction(
    () => currentIndex.value,
    (i) => {
      const isScreenActive = TAB_SCREENS[i] === screenName;
      runOnJS(setIsScreenFocused)(isScreenActive);
    }
  );
  return isScreenFocused;
};

export default useIsTopTabScreenFocused;
