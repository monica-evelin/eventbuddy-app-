import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Events from "../screens/EventDetails";
import EventDetails from "../screens/EventDetails";

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ title: "Events" }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{ title: "Event Details" }}
      />
    </Stack.Navigator>
  );
}
