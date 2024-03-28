export type RouteParams = {
  List: undefined;
  Detail: { id: number; name: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RouteParams {}
  }
}
