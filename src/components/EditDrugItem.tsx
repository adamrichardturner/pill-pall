import React from "react"
import { View, Text, StyleSheet, Switch, Alert } from "react-native"
import { Drug } from "../types/types"
import { isWearOS } from "../types/platform"
import { Colors } from "../utils/colors"

interface EditDrugItemProps {
  drug: Drug
  onToggleActive: () => void
  onEdit: () => void
  onDelete: () => void
}

export const EditDrugItem: React.FC<EditDrugItemProps> = ({
  drug,
  onToggleActive,
  onEdit,
  onDelete,
}) => {
  const handleDelete = () => {
    Alert.alert(
      "Delete Drug",
      `Are you sure you want to delete ${drug.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.leftContent}>
          <Text style={styles.name}>{drug.name}</Text>
          <Text style={styles.details}>
            Every {drug.frequencyHours}h, max {drug.maxDailyDoses}/day
          </Text>
        </View>
        <Switch value={drug.isActive} onValueChange={onToggleActive} />
      </View>
      <View style={styles.buttonRow}>
        <Text style={styles.editButton} onPress={onEdit}>
          Edit
        </Text>
        <Text style={styles.deleteButton} onPress={handleDelete}>
          Delete
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  leftContent: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#666",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  editButton: {
    color: Colors.link,
    fontSize: 14,
  },
  deleteButton: {
    color: Colors.danger,
    fontSize: 14,
  },
})
