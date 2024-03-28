import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteParams } from "../routeParams";
import { Image, View } from "react-native";

export default function Detail({
  route,
}: NativeStackScreenProps<RouteParams, "Detail">) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${route.params.id}.png`,
        }}
        style={{ height: 300, width: 300 }}
      />
    </View>
  );
}
