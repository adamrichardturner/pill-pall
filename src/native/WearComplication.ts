import { NativeModules, Platform } from "react-native"

interface WearComplicationInterface {
  updateComplication(data: string): Promise<void>
  updateNextDose(drugId: string, nextDoseTime: string): Promise<void>
}

const { WearComplication } = NativeModules

export default Platform.OS === "android"
  ? (WearComplication as WearComplicationInterface)
  : {
      updateComplication: async () => {
        console.warn("WearComplication is only available on Android")
      },
      updateNextDose: async () => {
        console.warn("WearComplication is only available on Android")
      },
    }
