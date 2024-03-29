import { NavigatorScreenParams } from "@react-navigation/native";

export type StackParams = {
  List: undefined;
  Detail: { id: number; name: string };
};
export type TabParams = {
  Dex: NavigatorScreenParams<StackParams>;
  Cards: undefined;
  Go: undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends TabParams {}
  }
}
