import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Activity, Schedule, UserProfile } from '../types';
import { generateSchedule } from '../core/scheduleAI';
import { useAuth } from './AuthContext';

interface ScheduleContextType {
  activities: Activity[];
  schedule: Schedule | null;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  useEffect(() => {
    // Regenerate schedule whenever activities or user changes
    if (user && activities.length > 0) {
      const newSchedule = generateSchedule(activities, user);
      setSchedule(newSchedule);
    } else {
      setSchedule(null); // Clear schedule if no activities or user
    }
  }, [activities, user]);

  const addActivity = (activityData: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: `act-${new Date().getTime()}`, // Simple unique ID
    };
    setActivities(prev => [...prev, newActivity]);
  };

  return (
    <ScheduleContext.Provider value={{ activities, schedule, addActivity }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
}
