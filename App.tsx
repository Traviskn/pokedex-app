import type { ComponentProps } from "react";
import { StatusBar } from "expo-status-bar";
import Icon from "@expo/vector-icons/MaterialIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TabParams, StackParams } from "./routeParams";
import List from "./screens/List";
import Detail from "./screens/Detail";
import Cards from "./screens/Cards";
import Go from "./screens/Go";

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<StackParams>();

function DexStack() {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={List}
        options={{ headerLargeTitle: true, title: "Pokedex" }}
      />

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={({ route }) => ({
          title: route.params.name.toUpperCase(),
        })}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator<TabParams>();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
          initialRouteName="Dex"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let name: ComponentProps<typeof Icon>["name"] =
                "catching-pokemon";
              if (route.name === "Cards") {
                name = "web-stories";
              }
              if (route.name === "Go") {
                name = "location-pin";
              }
              return <Icon name={name} color={color} size={size} />;
            },
          })}
        >
          <Tab.Screen name="Dex" component={DexStack} />
          <Tab.Screen name="Cards" component={Cards} />
          <Tab.Screen name="Go" component={Go} />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
