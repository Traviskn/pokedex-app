import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";

export default function List() {
  const nav = useNavigation();
  return (
    <Button
      title="Detail ->"
      onPress={() => nav.navigate("Detail", { id: "test" })}
    />
  );
}
