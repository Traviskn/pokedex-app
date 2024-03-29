import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Camera, CameraType } from "expo-camera";

import { MapStackParams } from "../routeParams";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1, justifyContent: "flex-end", alignItems: "center" },
  pokemon: {
    position: "absolute",
    top: height / 3,
    bottom: height / 3,
    right: width / 3,
    left: width / 3,
  },
  bottomOverlay: {
    position: "absolute",
    padding: 16,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default function CameraScreen({
  route,
}: NativeStackScreenProps<MapStackParams, "Camera">) {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission || !permission.granted) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back}>
        <Animated.Image source={route.params.image} style={styles.pokemon} />

        <View style={styles.bottomOverlay}>
          <Animated.Image source={require("../assets/pokemon/pokeball.png")} />
        </View>
      </Camera>
    </View>
  );
}
