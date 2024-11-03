import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NavigationProp } from "../types/navigation"

interface HeaderProps {
  title: string
  showSettings?: boolean
  showEdit?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showSettings = true,
  showEdit = true,
}) => {
  const navigation = useNavigation<NavigationProp>()

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actions}>
        {showEdit && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EditDrugs")}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
        )}
        {showSettings && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Settings")}
          >
            <Text>⚙️</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    padding: 8,
  },
})
