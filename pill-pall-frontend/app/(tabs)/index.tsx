import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { PillPallLogo } from '@/components/PillPallLogo';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  color: string;
  isOverdue: boolean;
}

const medications: Medication[] = [
  {
    id: '1',
    name: 'Codeine',
    dosage: '30mg',
    frequency: 'every 4 hours',
    nextDose: '08:00 AM',
    color: '#FFD700',
    isOverdue: true,
  },
  {
    id: '2',
    name: 'Ibuprofen',
    dosage: '200mg',
    frequency: 'every 4 hours',
    nextDose: '10:00 AM',
    color: '#90EE90',
    isOverdue: false,
  },
  {
    id: '3',
    name: 'Acetaminophen',
    dosage: '500mg',
    frequency: 'every 4 hours',
    nextDose: '12:00 PM',
    color: '#FFA500',
    isOverdue: false,
  },
  {
    id: '4',
    name: 'Naproxen',
    dosage: '250mg',
    frequency: 'every 8 hours',
    nextDose: '02:00 PM',
    color: '#32CD32',
    isOverdue: false,
  },
];

export default function HomeScreen() {
  const overdueMedications = medications.filter((med) => med.isOverdue);
  const activeMedications = medications.filter((med) => !med.isOverdue);

  const handleMarkAsTaken = (medicationId: string) => {
    Alert.alert('Mark as Taken', 'This medication has been marked as taken.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <PillPallLogo size="small" showText />
      </View>

      {/* Overdue Medications */}
      {overdueMedications.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="exclamation-triangle" size={20} color="#FF5555" />
            <Text style={styles.sectionTitle}>Overdue Medications</Text>
          </View>

          {overdueMedications.map((medication) => (
            <View key={medication.id} style={[styles.medicationCard, styles.overdueMedicationCard]}>
              <View style={styles.medicationHeader}>
                <View style={styles.medicationInfo}>
                  <View style={[styles.pillIcon, { backgroundColor: medication.color }]}>
                    <FontAwesome name="circle" size={12} color="#FFF" />
                  </View>
                  <View style={styles.medicationDetails}>
                    <Text style={styles.medicationName}>{medication.name}</Text>
                    <Text style={styles.medicationDosage}>
                      {medication.dosage}, {medication.frequency}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.markAsTakenButton}
                  onPress={() => handleMarkAsTaken(medication.id)}
                >
                  <Text style={styles.markAsTakenText}>Mark as Taken</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Active Medications */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="medkit" size={20} color="#007AFF" />
          <Text style={styles.sectionTitle}>Active Medications</Text>
        </View>

        {activeMedications.map((medication) => (
          <TouchableOpacity key={medication.id} style={styles.medicationCard}>
            <View style={styles.medicationHeader}>
              <View style={styles.medicationInfo}>
                <View style={[styles.pillIcon, { backgroundColor: medication.color }]}>
                  <FontAwesome name="circle" size={12} color="#FFF" />
                </View>
                <View style={styles.medicationDetails}>
                  <Text style={styles.medicationName}>{medication.name}</Text>
                  <Text style={styles.medicationDosage}>
                    {medication.dosage}, {medication.frequency}
                  </Text>
                </View>
              </View>
              <View style={styles.nextDoseContainer}>
                <Text style={styles.nextDoseLabel}>Next dose:</Text>
                <Text style={styles.nextDoseTime}>{medication.nextDose}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 10,
  },
  medicationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overdueMedicationCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF5555',
    backgroundColor: '#FFF5F5',
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pillIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  medicationDetails: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#8E8E93',
  },
  nextDoseContainer: {
    alignItems: 'flex-end',
  },
  nextDoseLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  nextDoseTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  markAsTakenButton: {
    backgroundColor: '#FF5555',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  markAsTakenText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
