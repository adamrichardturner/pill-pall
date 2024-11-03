import React from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native"
import { Drug } from "../types/types"

interface DrugFormProps {
  visible: boolean
  onClose: () => void
  onSave: (
    drug: Omit<Drug, "id" | "order" | "lastTaken" | "currentTimer">
  ) => void
  initialValues?: Drug
}

export const DrugForm: React.FC<DrugFormProps> = ({
  visible,
  onClose,
  onSave,
  initialValues,
}) => {
  const [name, setName] = React.useState(initialValues?.name ?? "")
  const [frequencyHours, setFrequencyHours] = React.useState(
    initialValues?.frequencyHours.toString() ?? "4"
  )
  const [maxDailyDoses, setMaxDailyDoses] = React.useState(
    initialValues?.maxDailyDoses.toString() ?? "4"
  )

  const handleSave = () => {
    if (!name || !frequencyHours || !maxDailyDoses) return

    onSave({
      name,
      frequencyHours: Number(frequencyHours),
      maxDailyDoses: Number(maxDailyDoses),
      isActive: initialValues?.isActive ?? true,
    })
  }

  return (
    <Modal visible={visible} transparent animationType='fade'>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.modalContainer}
            >
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps='handled'
              >
                <View style={styles.formContainer}>
                  <Text style={styles.title}>
                    {initialValues ? "Edit Drug" : "Add New Drug"}
                  </Text>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                      style={styles.input}
                      value={name}
                      onChangeText={setName}
                      placeholder='Drug name'
                      autoFocus
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Hours between doses:</Text>
                    <TextInput
                      style={styles.input}
                      value={frequencyHours}
                      onChangeText={setFrequencyHours}
                      keyboardType='numeric'
                      placeholder='4'
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Maximum daily doses:</Text>
                    <TextInput
                      style={styles.input}
                      value={maxDailyDoses}
                      onChangeText={setMaxDailyDoses}
                      keyboardType='numeric'
                      placeholder='4'
                    />
                  </View>

                  <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={() => {
                      handleSave()
                      onClose()
                    }}
                  >
                    <Text style={styles.saveButtonText}>
                      {initialValues ? "Save" : "Add"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={onClose}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  cancelButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
})
