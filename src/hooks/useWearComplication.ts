import { useEffect } from "react"
import { Drug } from "../types/types"
import { isWearOS } from "../types/platform"
import WearComplication from "../native/WearComplication"

export const useWearComplication = (topDrugs: Drug[]) => {
  useEffect(() => {
    if (!isWearOS) return

    const updateComplication = async () => {
      const complicationData = topDrugs.map((drug) => {
        const canTake =
          !drug.currentTimer ||
          new Date(drug.currentTimer.endTime) <= new Date()

        return {
          id: drug.id,
          text: drug.name.charAt(0).toUpperCase(),
          description: drug.name,
          color: canTake ? "#00ff00" : "#ff0000",
          timeLeft: drug.currentTimer
            ? new Date(drug.currentTimer.endTime).getTime() - Date.now()
            : 0,
        }
      })

      try {
        await WearComplication.updateComplication(
          JSON.stringify({
            drugs: complicationData,
          })
        )
      } catch (error) {
        console.error("Failed to update complication:", error)
      }
    }

    updateComplication()
    const timer = setInterval(updateComplication, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [topDrugs])
}
