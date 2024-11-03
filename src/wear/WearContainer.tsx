import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { useDrugs } from "../context/DrugContext"
import { Complication } from "./Complication"
import { Tile } from "./Tile"
import { useWearComplication } from "../hooks/useWearComplication"

interface WearContainerProps {
  mode: "complication" | "tile"
}

const WEAR_SCREEN_SIZE = Math.min(
  Dimensions.get("window").width,
  Dimensions.get("window").height
)

export const WearContainer: React.FC<WearContainerProps> = ({ mode }) => {
  const { topDrugs, updateDrug } = useDrugs()
  useWearComplication(topDrugs)

  return (
    <View
      style={[
        styles.container,
        {
          width: WEAR_SCREEN_SIZE,
          height: WEAR_SCREEN_SIZE,
        },
      ]}
    >
      {mode === "complication" ? (
        <Complication drugs={topDrugs} />
      ) : (
        <Tile drugs={topDrugs} onDrugPress={updateDrug} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: WEAR_SCREEN_SIZE / 2,
    overflow: "hidden",
  },
})
