import React from "react"
import { Drug } from "../types/types"
import { differenceInSeconds, format, addMinutes } from "date-fns"
import WearComplication from "../native/WearComplication"

interface ComplicationProps {
  drugs: Drug[]
}

export const Complication: React.FC<ComplicationProps> = ({ drugs }) => {
  React.useEffect(() => {
    const updateComplication = () => {
      const now = new Date()
      const drugsWithNextDose = drugs.map((drug) => {
        let nextDoseTime: Date | null = null

        // Check current timer
        if (drug.currentTimer) {
          nextDoseTime = new Date(drug.currentTimer.endTime)
        }

        // Check 24-hour limit
        const last24Hours = drug.lastTaken.filter(
          (date) => differenceInSeconds(now, date) <= 24 * 60 * 60
        )

        if (last24Hours.length >= drug.maxDailyDoses) {
          const oldestDose = new Date(
            Math.min(...last24Hours.map((d) => d.getTime()))
          )
          const nextAvailable = addMinutes(oldestDose, 24 * 60)

          if (!nextDoseTime || nextAvailable < nextDoseTime) {
            nextDoseTime = nextAvailable
          }
        }

        return {
          name: drug.name,
          nextDose: nextDoseTime,
        }
      })

      // Sort by next dose time
      const sortedDrugs = drugsWithNextDose
        .filter((d) => d.nextDose !== null)
        .sort((a, b) => a.nextDose!.getTime() - b.nextDose!.getTime())

      if (sortedDrugs.length > 0) {
        const nextDrug = sortedDrugs[0]
        const othersCount = sortedDrugs.length - 1

        const complicationData = {
          text: nextDrug.name,
          time: format(nextDrug.nextDose!, "HH:mm"),
          othersCount,
        }

        WearComplication.updateComplication(JSON.stringify(complicationData))
      }
    }

    const timer = setInterval(updateComplication, 60000) // Update every minute
    updateComplication()

    return () => clearInterval(timer)
  }, [drugs])

  return null // This component doesn't render anything
}
