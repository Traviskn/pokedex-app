import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouteParams } from "./routeParams";
import List from "./screens/List";
import Detail from "./screens/Detail";

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<RouteParams>();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style="auto" />

        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List" component={List} />

          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
