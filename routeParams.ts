import { NavigatorScreenParams } from "@react-navigation/native";

export type DexStackParams = {
  List: undefined;
  Detail: { id: number; name: string };
};
export type MapStackParams = {
  Map: undefined;
  Camera: { image: any };
};
export type TabParams = {
  Dex: NavigatorScreenParams<DexStackParams>;
  Cards: undefined;
  Go: MapStackParams;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends TabParams {}
  }
}
