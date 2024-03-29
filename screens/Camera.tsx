import { useEffect, useMemo, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Camera, CameraType } from "expo-camera";

import { MapStackParams } from "../routeParams";

const { height, width } = Dimensions.get("window");
const pokemonX = width / 2;
const pokemonY = height / 2;

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

function AnimatedContainer({ image }: { image: any }) {
  const [isCaptured, setIsCaptured] = useState(false);

  const capture = () => {
    setIsCaptured(true);
    Alert.alert("Got 'em!");
  };

  const pokeballX = useSharedValue(0);
  const pokeballY = useSharedValue(0);

  const drag = useMemo(
    () =>
      Gesture.Pan()
        .onChange((event) => {
          pokeballX.value += event.changeX;
          pokeballY.value += event.changeY;
        })
        .onEnd((event) => {
          if (
            Math.abs(event.absoluteX - pokemonX) < 50 &&
            Math.abs(event.absoluteY - pokemonY) < 50
          ) {
            runOnJS(capture)();
          }
        }),
    [],
  );

  const pokeballStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: pokeballX.value,
      },
      {
        translateY: pokeballY.value,
      },
    ],
  }));

  return (
    <View style={styles.camera}>
      {isCaptured ? null : (
        <Animated.Image source={image} style={styles.pokemon} />
      )}

      <View style={styles.bottomOverlay}>
        <GestureDetector gesture={drag}>
          <Animated.Image
            source={require("../assets/pokemon/pokeball.png")}
            style={pokeballStyle}
          />
        </GestureDetector>
      </View>
    </View>
  );
}

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
    <Camera style={styles.container} type={CameraType.back}>
      <AnimatedContainer image={route.params.image} />
    </Camera>
  );
}
