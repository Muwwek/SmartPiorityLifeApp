import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSchedule } from '../../src/contexts/ScheduleContext';
import { ScheduledItem } from '../../src/types';

export default function ScheduleScreen() {
  const { schedule } = useSchedule();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderScheduleItem = ({ item }: { item: ScheduledItem }) => (
    <View style={styles.scheduleItem}>
      <Text style={styles.timeText}>{formatTime(item.startTime)} - {formatTime(item.endTime)}</Text>
      <Text style={styles.titleText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {schedule && schedule.items.length > 0 ? (
        <FlatList
          data={schedule.items}
          renderItem={renderScheduleItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your schedule is empty.</Text>
            <Text style={styles.emptyHint}>Add some activities on the Dashboard!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  list: { padding: 16 },
  scheduleItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    width: 140,
  },
  titleText: {
    fontSize: 16,
    flex: 1,
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyText: { fontSize: 18, color: '#627d98' },
  emptyHint: { fontSize: 14, color: '#9fb3c8', marginTop: 8}
});
