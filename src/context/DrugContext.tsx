import React, { createContext, useContext, useState, useEffect } from "react"
import { Drug, DrugStore } from "../types/types"
import { loadData, saveData } from "../utils/storage"

interface DrugContextType {
  drugs: Drug[]
  topDrugs: Drug[]
  updateDrug: (drug: Drug) => Promise<void>
  reorderDrugs: (drugs: Drug[]) => Promise<void>
  addDrug: (
    drug: Omit<Drug, "id" | "order" | "lastTaken" | "currentTimer">
  ) => Promise<void>
  deleteDrug: (id: string) => Promise<void>
  toggleDrugActive: (id: string) => Promise<void>
}

const DrugContext = createContext<DrugContextType | undefined>(undefined)

export const DrugProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [drugs, setDrugs] = useState<Drug[]>([])

  useEffect(() => {
    loadDrugs()
  }, [])

  const loadDrugs = async () => {
    const data = await loadData()
    setDrugs(data.drugs)
  }

  const updateStore = async (newDrugs: Drug[]) => {
    await saveData({ drugs: newDrugs })
    setDrugs(newDrugs)
  }

  const value: DrugContextType = {
    drugs,
    topDrugs: drugs
      .filter((drug) => drug.isActive)
      .sort((a, b) => a.order - b.order)
      .slice(0, 3),
    updateDrug: async (drug) => {
      const newDrugs = drugs.map((d) => (d.id === drug.id ? drug : d))
      await updateStore(newDrugs)
    },
    reorderDrugs: async (newDrugs) => {
      await updateStore(newDrugs)
    },
    addDrug: async (drugData) => {
      const newDrug: Drug = {
        id: Date.now().toString(),
        order: drugs.length,
        lastTaken: [],
        ...drugData,
      }
      await updateStore([...drugs, newDrug])
    },
    deleteDrug: async (id) => {
      const newDrugs = drugs.filter((d) => d.id !== id)
      await updateStore(newDrugs)
    },
    toggleDrugActive: async (id) => {
      const newDrugs = drugs.map((d) =>
        d.id === id ? { ...d, isActive: !d.isActive } : d
      )
      await updateStore(newDrugs)
    },
  }

  return <DrugContext.Provider value={value}>{children}</DrugContext.Provider>
}

export const useDrugs = () => {
  const context = useContext(DrugContext)
  if (context === undefined) {
    throw new Error("useDrugs must be used within a DrugProvider")
  }
  return context
}
