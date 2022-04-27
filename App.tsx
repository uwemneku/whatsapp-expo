import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomTopTab } from "./src/screens";
import {
  Lato_100Thin,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import { useFonts } from "expo-font";

export default function App() {
  const [fontLoaded] = useFonts({
    // thin: Lato_100Thin,
    // light: Lato_300Light,
    regular: require("./src/constants/Helvetica-Font/Helvetica.ttf"),
    bold: require("./src/constants/Helvetica-Font/Helvetica-Bold.ttf"),
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {fontLoaded ? <CustomTopTab /> : <View />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
