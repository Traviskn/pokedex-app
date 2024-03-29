import type { ComponentProps } from "react";
import { StatusBar } from "expo-status-bar";
import Icon from "@expo/vector-icons/MaterialIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TabParams, DexStackParams, MapStackParams } from "./routeParams";
import List from "./screens/List";
import Detail from "./screens/Detail";
import Cards from "./screens/Cards";
import Map from "./screens/Map";
import Camera from "./screens/Camera";

const queryClient = new QueryClient();

const StackStackNav = createNativeStackNavigator<DexStackParams>();

function DexStack() {
  return (
    <StackStackNav.Navigator initialRouteName="List">
      <StackStackNav.Screen
        name="List"
        component={List}
        options={{ headerLargeTitle: true, title: "Pokedex" }}
      />

      <StackStackNav.Screen
        name="Detail"
        component={Detail}
        options={({ route }) => ({
          title: route.params.name.toUpperCase(),
        })}
      />
    </StackStackNav.Navigator>
  );
}

const MapStackNav = createNativeStackNavigator<MapStackParams>();

function MapStack() {
  return (
    <MapStackNav.Navigator initialRouteName="Map">
      <MapStackNav.Screen name="Map" component={Map} />
      <MapStackNav.Screen name="Camera" component={Camera} />
    </MapStackNav.Navigator>
  );
}

const Tab = createBottomTabNavigator<TabParams>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            <Tab.Screen name="Go" component={MapStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
