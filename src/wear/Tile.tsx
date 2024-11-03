import React from "react"
import { View, StyleSheet } from "react-native"
import { Drug } from "../types/types"
import { DrugButton } from "../components/DrugButton"

interface TileProps {
  drugs: Drug[]
  onDrugPress: (drug: Drug) => void
}

export const Tile: React.FC<TileProps> = ({ drugs, onDrugPress }) => {
  const topDrugs = drugs
    .filter((drug) => drug.isActive)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3)

  return (
    <View style={styles.container}>
      {topDrugs.map((drug) => (
        <DrugButton
          key={drug.id}
          drug={drug}
          onPress={() => onDrugPress(drug)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#000",
  },
})
