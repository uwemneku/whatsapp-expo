import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";

const Calls = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ width }}>
      <Text>Calls</Text>
    </View>
  );
};

export default Calls;

const styles = StyleSheet.create({});
