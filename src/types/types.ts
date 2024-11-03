export interface Drug {
  id: string
  name: string
  isActive: boolean
  frequencyHours: number
  maxDailyDoses: number
  order: number
  lastTaken: Date[]
  currentTimer?: {
    startTime: Date
    endTime: Date
  }
}

export interface DrugStore {
  drugs: Drug[]
}
