import Animated from "react-native-reanimated";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MapStackParams } from "../routeParams";

export default function Camera({
  route,
}: NativeStackScreenProps<MapStackParams, "Camera">) {
  return <Animated.Image source={route.params.image} />;
}
