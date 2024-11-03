import React from "react"
import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { Drug } from "../types/types"
import { differenceInSeconds, format } from "date-fns"
import { Colors } from "../utils/colors"

interface DrugButtonProps {
  drug: Drug
  onPress: () => void
}

export const DrugButton: React.FC<DrugButtonProps> = ({ drug, onPress }) => {
  const [timeLeft, setTimeLeft] = React.useState<string>("")
  const [canTake, setCanTake] = React.useState(true)
  const [dosesLeft, setDosesLeft] = React.useState(drug.maxDailyDoses)

  React.useEffect(() => {
    const updateTimer = () => {
      if (drug.currentTimer) {
        const secondsLeft = differenceInSeconds(
          drug.currentTimer.endTime,
          new Date()
        )
        if (secondsLeft <= 0) {
          setTimeLeft("")
          setCanTake(true)
        } else {
          setTimeLeft(format(new Date(secondsLeft * 1000), "HH:mm:ss"))
          setCanTake(false)
        }
      }

      // Calculate doses left in last 24 hours
      const now = new Date()
      const last24Hours = drug.lastTaken.filter(
        (date) => differenceInSeconds(now, date) <= 24 * 60 * 60
      )
      setDosesLeft(drug.maxDailyDoses - last24Hours.length)
    }

    const timer = setInterval(updateTimer, 1000)
    updateTimer()

    return () => clearInterval(timer)
  }, [drug])

  const progressWidth = drug.currentTimer
    ? (differenceInSeconds(new Date(), drug.currentTimer.startTime) /
        (drug.frequencyHours * 3600)) *
      100
    : 0

  const dosesTaken = drug.maxDailyDoses - dosesLeft

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!canTake || dosesLeft <= 0}
      style={[
        styles.button,
        {
          borderColor: !canTake
            ? Colors.danger
            : dosesLeft > 0
            ? Colors.primary
            : Colors.textSecondary,
        },
      ]}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.drugName}>{drug.name}</Text>
        {timeLeft && <Text style={styles.timer}>{timeLeft}</Text>}
        <View style={styles.dosesContainer}>
          {[...Array(drug.maxDailyDoses)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.doseIndicator,
                {
                  backgroundColor:
                    index < dosesTaken ? Colors.primary : Colors.textSecondary,
                },
              ]}
            />
          ))}
        </View>
      </View>
      {drug.currentTimer && (
        <View
          style={[
            styles.progressBar,
            {
              width: `${Math.min(progressWidth, 100)}%`,
              backgroundColor: Colors.danger + "1A",
            },
          ]}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    overflow: "hidden",
  },
  contentContainer: {
    zIndex: 1,
  },
  drugName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timer: {
    fontSize: 14,
    marginTop: 4,
  },
  dosesContainer: {
    flexDirection: "row",
    marginTop: 8,
    gap: 4,
  },
  doseIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressBar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
})
