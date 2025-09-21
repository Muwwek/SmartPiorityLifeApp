import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../../src/contexts/AuthContext';

export default function SettingsScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user?.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>

        <Text style={styles.label}>Work Hours:</Text>
        <Text style={styles.value}>
          {user?.preferences.workStartTime} - {user?.preferences.workEndTime}
        </Text>

        <View style={styles.buttonContainer}>
          <Button title="Logout" onPress={logout} color="#FF3B30" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  content: { padding: 20 },
  label: { fontSize: 16, color: 'gray', marginTop: 20 },
  value: { fontSize: 20, marginBottom: 10 },
  buttonContainer: { marginTop: 40 },
});
