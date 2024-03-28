export type RouteParams = {
  List: undefined;
  Detail: { id: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RouteParams {}
  }
}
