import { View, Text, Button, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useSchedule } from '../../src/contexts/ScheduleContext';
import { Activity } from '../../src/types';

export default function DashboardScreen() {
  const { activities } = useSchedule();

  const renderActivityItem = ({ item }: { item: Activity }) => (
    <View style={styles.activityItem}>
      <Text style={styles.activityTitle}>{item.title}</Text>
      <Text style={styles.activityDetails}>
        Duration: {item.durationMinutes} mins | Priority: {item.priority}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
       <View style={styles.header}>
         <Text style={styles.title}>Today's Activities</Text>
         <Link href="/add-activity" asChild>
            <Button title="+ Add New" />
         </Link>
       </View>
      
      {activities.length === 0 ? (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No activities added yet.</Text>
            <Text style={styles.emptyHint}>Tap "+ Add New" to start planning!</Text>
        </View>
      ) : (
        <FlatList
          data={activities}
          renderItem={renderActivityItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  list: { padding: 16 },
  activityItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityTitle: { fontSize: 16, fontWeight: '600' },
  activityDetails: { fontSize: 14, color: 'gray', marginTop: 4 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyText: { fontSize: 18, color: '#627d98' },
  emptyHint: { fontSize: 14, color: '#9fb3c8', marginTop: 8}
});
