// ประเภทของกิจกรรม
export type ActivityType = 'work' | 'health' | 'personal';

// ระดับความสำคัญตาม Eisenhower Matrix
export type PriorityLevel = 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important';

// ข้อมูลของแต่ละกิจกรรม
export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  priority: PriorityLevel;
  durationMinutes: number; // ระยะเวลาที่คาดว่าจะใช้ (นาที)
  deadline?: Date;         // กำหนดส่ง (ถ้ามี)
}

// รายการในตารางเวลาที่ AI สร้างขึ้น
export interface ScheduledItem {
  id: string;
  activityId: string;
  title: string;
  startTime: Date;
  endTime: Date;
}

// โครงสร้างของตารางเวลาทั้งหมด
export interface Schedule {
  date: Date;
  items: ScheduledItem[];
}

// ข้อมูลโปรไฟล์ผู้ใช้ (จำลอง)
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: {
    workStartTime: string; // e.g., "09:00"
    workEndTime: string;   // e.g., "18:00"
  };
}
