import { useEffect, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { View } from "react-native";
import { getRandomPokemon } from "./data/randomPokemon";

const latitudeDelta = 0.01;
const longitudeDelta = 0.008;

const initialRegion = {
  latitude: 0,
  longitude: 0,
  latitudeDelta,
  longitudeDelta,
};

export default function Go() {
  const [region, setRegion] = useState<Region>(initialRegion);
  const [pokemon, setPokemon] = useState<ReturnType<typeof getRandomPokemon>>(
    [],
  );

  console.log("POKEMON? ", pokemon);
  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    if (status?.status === "undetermined") {
      requestPermission();
    } else if (status?.status === "granted") {
      const locationSubPromise = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
        },
        (location) => {
          console.log("GOT LOCATION? ", location);
          const newRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta,
            longitudeDelta,
          };
          setRegion(newRegion);
          const newPokemon = getRandomPokemon(3, newRegion);
          setPokemon((oldPokemon) => oldPokemon.slice(0, 3).concat(newPokemon));
        },
      );
      return () => {
        locationSubPromise.then((sub) => sub.remove());
      };
    }
  }, [status]);

  return (
    <View style={{ flex: 1 }}>
      <MapView region={region} style={{ height: "100%", width: "100%" }}>
        <Marker
          key="trainer"
          coordinate={region}
          image={require("../assets/pokemon/trainer.png")}
        />
        {pokemon.map((p) => (
          <Marker
            key={`${p.longitude}-${p.latitude}`}
            coordinate={p}
            image={p.image}
            onPress={() => {
              console.log("PRESS ", p);
            }}
          />
        ))}
      </MapView>
    </View>
  );
}
