import { useEffect, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { View } from "react-native";

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

const initialRegion = {
  latitude: 0,
  longitude: 0,
  latitudeDelta,
  longitudeDelta,
};

export default function Go() {
  const [region, setRegion] = useState<Region>(initialRegion);

  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    if (status?.status === "undetermined") {
      requestPermission();
    } else if (status?.status === "granted") {
      const locationSubPromise = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
        },
        (location) => {
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta,
            longitudeDelta,
          });
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
        <Marker key="trainer" coordinate={region} />
      </MapView>
    </View>
  );
}
