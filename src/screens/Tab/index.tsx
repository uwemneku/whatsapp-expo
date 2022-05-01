import {
  BackHandler,
  ScrollView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import TabHeader from "./components/TabHeader";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Calls from "./Calls";
import Chats from "./Chats";
import Camera from "./Camera";
import Status from "./Status";
import FAB from "./components/FAB";
import { CurrentTabScreenContext } from "../../context";
import { TabRoutes } from "../../types";
import { TAB_SCREENS } from "../../constants";

const HomeTab = () => {
  const scrollOffset = useSharedValue(0);
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const activeTabScreenName = useSharedValue<TabRoutes>("Camera");

  const scrollToIndex = useCallback(
    (index: number) => {
      scrollRef.current &&
        scrollRef.current.scrollTo({ x: width * index, y: 0, animated: true });
    },
    [scrollRef.current]
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollOffset.value = contentOffset.x;
      const currentIndex = Math.abs(Math.round(scrollOffset.value / width));
      activeTabScreenName.value = TAB_SCREENS[currentIndex];
    },
  });

  //move the FAB component out of the way when the user is on the Camera screen
  const animatedFABContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollOffset.value,
          [0, width],
          [width, 0],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  useEffect(() => {
    //Event listener to scroll back to the chat screen when the user presses the back button
    //This is necessary so as not to close the app when the user is not on the chat screen
    //If the user is on the chat screen, the back button will close the app
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (activeTabScreenName.value === "Chat") {
          return false;
        }
        scrollToIndex(1);
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#008069"} />
      <CurrentTabScreenContext.Provider value={activeTabScreenName}>
        <TabHeader {...{ scrollOffset, scrollToIndex }} />
        <View style={{ flex: 1, zIndex: 1 }}>
          <Animated.ScrollView
            ref={scrollRef}
            onScroll={scrollHandler}
            horizontal
            snapToAlignment={"center"}
            snapToInterval={width}
            contentOffset={{ x: width, y: 0 }}
            disableIntervalMomentum
            showsHorizontalScrollIndicator={false}
          >
            <Camera />
            <Chats />
            <Status />
            <Calls />
          </Animated.ScrollView>
        </View>
        <Animated.View style={[styles.item, animatedFABContainerStyle]}>
          <FAB />
        </Animated.View>
      </CurrentTabScreenContext.Provider>
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    // overflow: "hidden",
  },
});
