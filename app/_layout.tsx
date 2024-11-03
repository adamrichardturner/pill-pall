import React from "react"
import { Stack } from "expo-router"
import { DrugProvider } from "../src/context/DrugContext"
import { isWearOS } from "../src/types/platform"
import { WearContainer } from "../src/wear/WearContainer"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function Layout() {
  if (isWearOS) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DrugProvider>
          <WearContainer mode='tile' />
        </DrugProvider>
      </GestureHandlerRootView>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DrugProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            gestureEnabled: true,
            gestureDirection: "horizontal",
            presentation: "card",
          }}
        >
          <Stack.Screen
            name='index'
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name='settings'
            options={{
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name='edit-drugs'
            options={{
              gestureEnabled: true,
            }}
          />
        </Stack>
      </DrugProvider>
    </GestureHandlerRootView>
  )
}
