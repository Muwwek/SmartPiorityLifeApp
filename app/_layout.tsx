import { Stack } from 'expo-router';
import { AuthProvider } from '../src/contexts/AuthContext';
import { ScheduleProvider } from '../src/contexts/ScheduleContext';

// Root layout ที่ครอบแอปทั้งหมด
export default function RootLayout() {
  return (
    // ครอบด้วย Provider เพื่อให้ทุกหน้าจอเข้าถึงข้อมูลได้
    <AuthProvider>
      <ScheduleProvider>
        <Stack screenOptions={{ headerStyle: { backgroundColor: '#f0f0f0' }}}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="add-activity"
            options={{ presentation: 'modal', title: 'Add New Activity' }}
          />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </ScheduleProvider>
    </AuthProvider>
  );
}
