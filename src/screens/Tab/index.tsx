import {
  BackHandler,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import TabHeader from "./components/TabHeader";
import Animated, {
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Calls from "./Calls";
import Chats from "./Chats";
import Camera from "./Camera";
import Status from "./Status";
import FAB from "./components/FAB";
import { TabRoutes } from "../../types";

const screens: TabRoutes[] = ["Camera", "Chat", "Status", "Calls"];

const HomeTab = () => {
  const scrollOffset = useSharedValue(0);
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const currentIndex = useSharedValue(0);

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
      currentIndex.value = Math.abs(Math.round(scrollOffset.value / width));
    },
  });

  useEffect(() => {
    //Event listener to scroll back to the chat screen when the user presses the back button
    //This is necessary so as not to close the app when the user is not on the chat screen
    //If the user is on the chat screen, the back button will close the app
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (currentIndex.value === 1) {
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
      <TabHeader {...{ scrollOffset, scrollToIndex }} />
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
      <FAB {...{ scrollOffset }} />
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
