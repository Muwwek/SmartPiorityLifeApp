import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../src/contexts/AuthContext';

export default function AuthScreen() {
  const { login } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SmartPriorityLife</Text>
        <Text style={styles.subtitle}>Let AI plan your perfect day</Text>
        <Button title="Login (Demo)" onPress={login} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8, color: '#102a43' },
  subtitle: { fontSize: 16, color: '#627d98', marginBottom: 30 },
});
