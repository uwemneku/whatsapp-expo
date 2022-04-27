import React from "react";
import { SharedValue } from "react-native-reanimated";
/**
 * A content that holds the current tab index of the Top Tab.
 */
export const CurrentTabContext =
  React.createContext<SharedValue<number>>(undefined);
