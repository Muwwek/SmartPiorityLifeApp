import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSchedule } from '../src/contexts/ScheduleContext';
import { ActivityType, PriorityLevel } from '../src/types';

export default function AddActivityModal() {
  const router = useRouter();
  const { addActivity } = useSchedule();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('not-urgent-important');

  const handleSave = () => {
    if (!title || !duration) {
      alert('Please fill in all fields.');
      return;
    }
    addActivity({
      title,
      durationMinutes: parseInt(duration, 10),
      priority,
      type: 'work', // Default type for simplicity
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Activity Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="e.g., Prepare presentation"
      />

      <Text style={styles.label}>Duration (minutes)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="e.g., 60"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityContainer}>
          {/* In a real app, this would be a nicer custom component */}
          <Button title="Urgent & Important" onPress={() => setPriority('urgent-important')} color={priority === 'urgent-important' ? '#007AFF' : 'gray'} />
          <Button title="Not Urgent & Important" onPress={() => setPriority('not-urgent-important')} color={priority === 'not-urgent-important' ? '#007AFF' : 'gray'} />
          <Button title="Urgent & Not Important" onPress={() => setPriority('urgent-not-important')} color={priority === 'urgent-not-important' ? '#007AFF' : 'gray'} />
      </View>

      <View style={styles.buttonGroup}>
        <Button title="Save Activity" onPress={handleSave} />
        <Button title="Cancel" onPress={() => router.back()} color={Platform.OS === 'ios' ? 'red' : 'gray'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, gap: 10 },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    priorityContainer: {
        flexDirection: 'column',
        gap: 10,
        marginBottom: 20,
    },
    buttonGroup: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});
