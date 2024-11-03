import React from "react"
import { View, StyleSheet, Text, SafeAreaView } from "react-native"
import { DrugButton } from "../src/components/DrugButton"
import { useDrugs } from "../src/context/DrugContext"
import { addHours } from "date-fns"
import { Drug } from "../src/types/types"
import { Link } from "expo-router"
import { ScrollView } from "react-native-gesture-handler"

export default function Index() {
  const { drugs, updateDrug } = useDrugs()
  const activeDrugs = drugs.filter((drug) => drug.isActive)

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        bounces={true}
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={16}
      >
        <Text style={styles.title}>PillPall 💊</Text>

        <View style={styles.drugList}>
          {activeDrugs.map((drug) => (
            <DrugButton
              key={drug.id}
              drug={drug}
              onPress={() => handleDrugPress(drug)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Link href='/edit-drugs' style={styles.link}>
            {activeDrugs.length > 0 ? "Edit Drugs" : "Add Drug"}
          </Link>
          <Link href='/settings' style={styles.link}>
            Settings
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  drugList: {
    gap: 12,
  },
  footer: {
    marginTop: 24,
    gap: 12,
    alignItems: "center",
  },
  link: {
    fontSize: 16,
    color: "#007AFF",
    padding: 8,
  },
})
