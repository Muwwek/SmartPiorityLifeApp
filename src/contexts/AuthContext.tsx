import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserProfile } from '../types';
// import { useRouter, useSegments } from 'expo-router';

// ข้อมูลจำลองของผู้ใช้
const MOCK_USER: UserProfile = {
  id: 'user-123',
  name: 'Demo User',
  email: 'demo@example.com',
  preferences: {
    workStartTime: '09:00',
    workEndTime: '18:00',
  },
};

interface AuthContextType {
  user: UserProfile | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  // const router = useRouter();
  // const segments = useSegments();

  /*
  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
      router.replace('/auth');
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, segments]);
  */


  const login = () => {
    setUser(MOCK_USER);
    // router.replace('/');
  };

  const logout = () => {
    setUser(null);
    // router.replace('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

