import { Activity, Schedule, ScheduledItem, UserProfile } from "../types";

/**
 * ฟังก์ชันจำลองการทำงานของ AI ในการจัดตารางเวลา
 * @param activities - รายการกิจกรรมทั้งหมดที่ผู้ใช้ป้อนเข้ามา
 * @param userProfile - โปรไฟล์และการตั้งค่าของผู้ใช้
 * @returns ตารางเวลาใหม่ที่จัดเรียบร้อยแล้ว
 */
export function generateSchedule(
  activities: Activity[],
  userProfile: UserProfile
): Schedule {
  console.log("AI is processing activities with user preferences:", userProfile.preferences);

  // 1. เรียงลำดับกิจกรรมตาม Priority (ตัวอย่างอย่างง่าย)
  // ในโลกจริง อาจต้องพิจารณา Deadline และปัจจัยอื่นๆ ที่ซับซ้อนกว่านี้
  const priorityOrder: Record<string, number> = {
    'urgent-important': 4,
    'not-urgent-important': 3,
    'urgent-not-important': 2,
    'not-urgent-not-important': 1,
  };
  const sortedActivities = [...activities].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

  // 2. จัดสรรกิจกรรมลงในตารางเวลาตามเวลาทำงานของผู้ใช้
  const scheduledItems: ScheduledItem[] = [];
  const today = new Date();
  const [startHour, startMinute] = userProfile.preferences.workStartTime.split(':').map(Number);
  
  let currentTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHour, startMinute);

  for (const activity of sortedActivities) {
    const startTime = new Date(currentTime);
    const endTime = new Date(startTime.getTime() + activity.durationMinutes * 60000);
    
    scheduledItems.push({
      id: `${activity.id}-scheduled`,
      activityId: activity.id,
      title: activity.title,
      startTime,
      endTime,
    });
    
    // อัปเดตเวลาปัจจุบันเพื่อเตรียมสำหรับกิจกรรมถัดไป
    currentTime = endTime;
  }

  const newSchedule: Schedule = {
    date: new Date(),
    items: scheduledItems,
  };

  console.log("AI generated new schedule:", newSchedule);
  return newSchedule;
}
