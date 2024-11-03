import AsyncStorage from "@react-native-async-storage/async-storage"
import { Drug, DrugStore } from "../types/types"

const STORAGE_KEY = "@PillPall:drugstore"

export const saveData = async (data: DrugStore) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving data:", error)
  }
}

export const loadData = async (): Promise<DrugStore> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : { drugs: [] }
  } catch (error) {
    console.error("Error loading data:", error)
    return { drugs: [] }
  }
}

export const exportData = async (): Promise<string> => {
  const data = await loadData()
  return JSON.stringify(data, null, 2)
}

export const importData = async (jsonString: string): Promise<boolean> => {
  try {
    const data = JSON.parse(jsonString)
    await saveData(data)
    return true
  } catch (error) {
    console.error("Error importing data:", error)
    return false
  }
}
