import { ScrollView, Text } from "react-native";

import { useListData } from "./useListData";

export default function List() {
  const { data } = useListData();
  return (
    <ScrollView style={{ flex: 1 }}>
      {data?.map((pokemon) => <Text key={pokemon.name}>{pokemon.name}</Text>)}
    </ScrollView>
  );
}
