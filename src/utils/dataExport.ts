import { Share, Platform } from "react-native"
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import { DrugStore } from "../types/types"
import { loadData } from "./storage"

export const shareData = async () => {
  try {
    const data = await loadData()
    const fileName = `pillpall_backup_${new Date().toISOString()}.json`
    const filePath = `${FileSystem.documentDirectory}${fileName}`

    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2))

    if (Platform.OS === "ios") {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath, {
          mimeType: "application/json",
          dialogTitle: "Export PillPall Configuration",
          UTI: "public.json",
        })
      }
    } else {
      await Share.share({
        title: "PillPall Backup",
        message: "Your PillPall medication configuration backup",
        url: `file://${filePath}`,
      })
    }
  } catch (error) {
    console.error("Error sharing data:", error)
    throw error
  }
}
