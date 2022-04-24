import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";

const Status = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width }}>
      <Text>satus</Text>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({});
