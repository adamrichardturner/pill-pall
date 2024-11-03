import React from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { DrugButton } from "../components/DrugButton"
import { useDrugs } from "../context/DrugContext"
import { addHours } from "date-fns"
import { Drug } from "../types/types"

export default function HomeScreen() {
  const { drugs, updateDrug } = useDrugs()

  const handleDrugPress = async (drug: Drug) => {
    const now = new Date()
    const updatedDrug = {
      ...drug,
      lastTaken: [...drug.lastTaken, now],
      currentTimer: {
        startTime: now,
        endTime: addHours(now, drug.frequencyHours),
      },
    }
    await updateDrug(updatedDrug)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={drugs.filter((drug) => drug.isActive)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DrugButton drug={item} onPress={() => handleDrugPress(item)} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
