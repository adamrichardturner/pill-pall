import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native"
import { useDrugs } from "../src/context/DrugContext"
import { DrugForm } from "../src/components/DrugForm"
import { Drug } from "../src/types/types"
import { EditDrugItem } from "../src/components/EditDrugItem"
import { useRouter } from "expo-router"
import { Colors } from "../src/utils/colors"

export default function EditDrugs() {
  const router = useRouter()
  const { drugs, toggleDrugActive, deleteDrug, addDrug, updateDrug } =
    useDrugs()
  const [showForm, setShowForm] = React.useState(false)
  const [editingDrug, setEditingDrug] = React.useState<Drug | undefined>()

  const handleSave = async (
    drugData: Omit<Drug, "id" | "order" | "lastTaken" | "currentTimer">
  ) => {
    if (editingDrug) {
      await updateDrug({ ...editingDrug, ...drugData })
    } else {
      await addDrug(drugData)
    }
    setShowForm(false)
    setEditingDrug(undefined)
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
        <Text style={styles.title}>
          {drugs.length > 0 ? "Edit Drugs" : "Add Drug"}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <FlatList
          data={drugs}
          renderItem={({ item }) => (
            <EditDrugItem
              drug={item}
              onToggleActive={() => toggleDrugActive(item.id)}
              onEdit={() => {
                setEditingDrug(item)
                setShowForm(true)
              }}
              onDelete={() => deleteDrug(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setEditingDrug(undefined)
                setShowForm(true)
              }}
            >
              <Text style={styles.addButtonText}>Add New Drug</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <DrugForm
        visible={showForm}
        onClose={() => {
          setShowForm(false)
          setEditingDrug(undefined)
        }}
        onSave={handleSave}
        initialValues={editingDrug}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  backButton: {
    padding: 12,
    marginLeft: 4,
  },
  backButtonText: {
    fontSize: 28,
    color: "#007AFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})
