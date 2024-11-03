import { Platform, PlatformConstants } from "react-native"

interface AndroidConstants extends PlatformConstants {
  Version: number
  Release: string
  Serial: string
  Fingerprint: string
  Model: string
  Brand: string
  Manufacturer: string
  ServerHost?: string
  uiMode: string
  isWearable?: boolean
}

export const isWearOS =
  Platform.OS === "android" &&
  (Platform.constants as AndroidConstants).isWearable === true
