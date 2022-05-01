import React, { useContext } from "react";
import { SharedValue } from "react-native-reanimated";
import { TabRoutes } from "../types";
/**
 * A context that holds the name of the currently focused screen in the Top Tab.
 */
export const CurrentTabScreenContext = React.createContext<
  SharedValue<TabRoutes>
>({
  value: "Camera",
});

export const useAnimatedTopTabContext = () =>
  useContext(CurrentTabScreenContext);
