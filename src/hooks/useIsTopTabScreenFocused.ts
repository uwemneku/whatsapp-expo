import { useContext, useState } from "react";
import { runOnJS, useAnimatedReaction } from "react-native-reanimated";
import { CurrentTabScreenContext } from "../context";
import { TabRoutes } from "../types";

const useIsTopTabScreenFocused = (screenName: TabRoutes) => {
  const [isScreenFocused, setIsScreenFocused] = useState(false);
  const currentScreenName = useContext(CurrentTabScreenContext);

  useAnimatedReaction(
    () => currentScreenName.value,
    (screen) => {
      const isScreenActive = screen === screenName;
      runOnJS(setIsScreenFocused)(isScreenActive);
    }
  );

  return isScreenFocused;
};

export default useIsTopTabScreenFocused;
