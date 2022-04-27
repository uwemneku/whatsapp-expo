import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Camera } from "expo-camera";
import Animated from "react-native-reanimated";
import useIsTopTabScreenFocused from "../../hooks/useIsTopTabScreenFocused";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<Boolean>(Boolean(null));
  const [type, setType] = useState(Camera.Constants.Type.back);
  const { width } = useWindowDimensions();
  const ref = useRef<Camera>(null);
  const isScreenFocused = useIsTopTabScreenFocused("Camera");

  useEffect(() => {
    isScreenFocused &&
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();

    (async () => {})();
  }, [isScreenFocused]);

  if (hasPermission === null) {
    return <View style={{ width }} />;
  }
  if (hasPermission === false) {
    return <Text style={{ width }}>No access to camera</Text>;
  }
  return (
    <View style={[styles.container, { width }]}>
      {isScreenFocused ? (
        <Camera ref={ref} style={styles.camera} type={type} ratio="2:1">
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={{ flex: 1, backgroundColor: "gray" }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
