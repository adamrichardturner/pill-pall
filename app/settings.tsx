import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native"
import { useRouter } from "expo-router"
import * as FileSystem from "expo-file-system"
import * as DocumentPicker from "expo-document-picker"
import { shareData } from "../src/utils/dataExport"
import { importData } from "@/src/utils/storage"

export default function Settings() {
  const router = useRouter()

  const handleExport = async () => {
    try {
      await shareData()
    } catch (error) {
      Alert.alert("Export Error", "Failed to export configuration")
      console.error(error)
    }
  }

  const handleImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
      })

      if (!result.canceled) {
        const fileContent = await FileSystem.readAsStringAsync(
          result.assets[0].uri
        )
        const success = await importData(fileContent)

        if (success) {
          Alert.alert(
            "Import Successful",
            "Your medication configuration has been imported"
          )
          router.replace("/")
        }
      }
    } catch (error) {
      Alert.alert(
        "Import Error",
        "Failed to import configuration. Please make sure the file is valid."
      )
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Backup & Restore</Text>
          <TouchableOpacity style={styles.button} onPress={handleExport}>
            <Text style={styles.buttonText}>Export Configuration</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleImport}>
            <Text style={styles.buttonText}>Import Configuration</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.version}>PillPall v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: "#007AFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  version: {
    color: "#666",
    fontSize: 14,
  },
})
