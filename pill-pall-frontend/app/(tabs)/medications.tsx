import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  color: string;
  isActive: boolean;
}

const medications: Medication[] = [
  {
    id: '1',
    name: 'Ibuprofen',
    dosage: '200mg',
    frequency: 'every 4 hours',
    nextDose: '10:00 AM',
    color: '#FFD700',
    isActive: true,
  },
  {
    id: '2',
    name: 'Acetaminophen',
    dosage: '500mg',
    frequency: 'every 4 hours',
    nextDose: '12:00 PM',
    color: '#FFA500',
    isActive: true,
  },
  {
    id: '3',
    name: 'Naproxen',
    dosage: '250mg',
    frequency: 'every 8 hours',
    nextDose: '02:00 PM',
    color: '#32CD32',
    isActive: true,
  },
];

export default function MedicationsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Medications</Text>
        <TouchableOpacity style={styles.addButton}>
          <FontAwesome name="plus" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.medicationsList}>
        {medications.map((medication) => (
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  addButton: {
    padding: 8,
  },
  medicationsList: {
    padding: 20,
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
});
