import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";

const Chats = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width, backgroundColor: "red" }}>
      <Text>Chats</Text>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({});
