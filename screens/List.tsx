import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlashList } from "@shopify/flash-list";
import Icon from "@expo/vector-icons/MaterialIcons";

import { useListData } from "./useListData";
import { DexStackParams } from "../routeParams";

const styles = StyleSheet.create({
  listContainer: { backgroundColor: "white" },
  name: { fontSize: 28 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLeft: { alignItems: "center", flexDirection: "row" },
});

export default function List({
  navigation,
}: NativeStackScreenProps<DexStackParams, "List">) {
  const { data, isFetchingNextPage, fetchNextPage, status, hasNextPage } =
    useListData();
  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.listContainer}
      data={data}
      estimatedItemSize={100}
      onEndReached={() => {
        !isFetchingNextPage && hasNextPage && fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          key={item.name}
          onPress={() =>
            navigation.navigate("Detail", { id: index + 1, name: item.name })
          }
          style={styles.row}
        >
          <View style={styles.rowLeft}>
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
              }}
              style={{
                height: 100,
                width: 100,
              }}
            />
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <Icon
            name={Platform.OS === "ios" ? "arrow-forward-ios" : "arrow-forward"}
            size={28}
            color="black"
          />
        </TouchableOpacity>
      )}
    />
  );
}
