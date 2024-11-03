import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"
import { exportData, importData } from "../utils/storage"

export default function SettingsScreen() {
  const handleExport = async () => {
    try {
      const data = await exportData()
      const fileName = `pillpall_backup_${new Date().toISOString()}.json`
      const filePath = `${FileSystem.documentDirectory}${fileName}`

      await FileSystem.writeAsStringAsync(filePath, data)

      await Share.share({
        url: filePath,
        title: "PillPall Backup",
        message: "Your PillPall medication configuration backup",
      })
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
        } else {
          throw new Error("Import failed")
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
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  section: {
    marginBottom: 24,
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
