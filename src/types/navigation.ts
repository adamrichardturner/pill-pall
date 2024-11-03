import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type RootStackParamList = {
  Home: undefined
  Settings: undefined
  EditDrugs: undefined
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>
